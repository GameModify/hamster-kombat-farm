import {randomUUID} from "node:crypto";

import {
    GameAppToken,
    GameClientId, GameClientToken,
    GameKey,
    GameKeysInfo,
    GamePromoId,
    KeyGeneratedCallback
} from "../entities"

import {generateClientId, sleep} from "../utils"
import {MiniGameKeysRequest} from "./entities";




export class GeneratorKeysApi {

    defaultHeaders = {
        'content-type': 'application/json; charset=utf-8',
        'Host': 'api.gamepromo.io'
    }


    async generateKey(clientToken: GameClientToken, keyInfo: MiniGameKeysRequest, callback: KeyGeneratedCallback){
        let keyAvailable = false
        while (!keyAvailable) {
            //delay
            console.log("sleep, key not available")
            await sleep(10000);
            keyAvailable = await this._emulateProgress(clientToken, keyInfo.gameInfo.gamePromoId)
        }

        const key = await this._generateKey(clientToken, keyInfo.gameInfo.gamePromoId)

        const gameKey: GameKey = {gameInfo: keyInfo.gameInfo, timestamp: Date.now(), value: key}
        await callback(gameKey)
    }

    async generateKeys(keyRequest: Array<MiniGameKeysRequest>, callback: KeyGeneratedCallback){
        for await (const keyInfo of keyRequest) {
            let countGeneratedKeys = 0
            while (countGeneratedKeys != keyInfo.count) {
                const clientId = generateClientId()
                const clientToken = await this._getToken(clientId, keyInfo.gameInfo.gameAppToken)

                if (!clientToken) {
                    console.warn("Got game client token is undefined")
                    await sleep(10000)
                    continue
                }
                console.log("Got game client token: ", clientToken)
                await this.generateKey(clientToken, keyInfo, callback)
                countGeneratedKeys += 1
            }
        }
        return null
    }


    async _getToken(clientId: GameClientId, appToken: GameAppToken) : Promise<GameClientToken>  {
        const request = await fetch('https://api.gamepromo.io/promo/login-client', {
            method: "POST",
            headers : this.defaultHeaders,
            body: JSON.stringify({appToken: appToken, clientId: clientId, clientOrigin: "deviceid"})
        });
        const response = await request.json() as { clientToken: GameClientToken }
        return response.clientToken
    }


    async _emulateProgress(clientToken: GameClientToken, promoId: GamePromoId) {
        const request = await fetch('https://api.gamepromo.io/promo/register-event', {
            method: "POST",
            headers : {...this.defaultHeaders, 'Authorization': `Bearer ${clientToken}`},
            body: JSON.stringify({ promoId: promoId, eventId: randomUUID(), eventOrigin: 'undefined' })
        });
        const response = await request.json() as { hasCode: boolean }
        return response.hasCode
    }

    async _generateKey(clientToken: GameClientToken, promoId: GamePromoId) {
        const request = await fetch('https://api.gamepromo.io/promo/create-code', {
            method: "POST",
            headers : {...this.defaultHeaders, 'Authorization': `Bearer ${clientToken}`},
            body: JSON.stringify({ promoId: promoId })
        });
        const response = await request.json() as { promoCode: GamePromoId }
        return response.promoCode
    }
}