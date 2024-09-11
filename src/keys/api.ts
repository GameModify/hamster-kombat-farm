import {randomUUID} from "node:crypto";

import {MiniGameAppToken, MiniGameClientId, MiniGameClientToken, MiniGamePromoId} from "./entities"

import {getLogger} from "../utils"


export class GeneratorKeysApi {

    public logger = getLogger();

    private _defaultHeaders = {
        'content-type': 'application/json; charset=utf-8',
        'Host': 'api.gamepromo.io'
    };

    async getToken(clientId: MiniGameClientId, appToken: MiniGameAppToken, headers: object) : Promise<MiniGameClientToken>  {
        const request = await fetch('https://api.gamepromo.io/promo/login-client', {
            method: "POST",
            headers : {...this._defaultHeaders, ...headers},
            body: JSON.stringify({appToken: appToken, clientId: clientId, clientOrigin: "deviceid"})
        });
        const response = await request.json() as { clientToken: MiniGameClientToken }
        return response.clientToken
    }

    async emulateProgress(clientToken: MiniGameClientToken, promoId: MiniGamePromoId, eventId: string, headers: object) {
        const request = await fetch('https://api.gamepromo.io/promo/register-event', {
            method: "POST",
            headers : {...this._defaultHeaders, ...headers, 'Authorization': `Bearer ${clientToken}`},
            body: JSON.stringify({ promoId: promoId, eventId: eventId, eventOrigin: 'undefined' })
        });
        const response = await request.json() as { hasCode: boolean }
        return response.hasCode
    }

    async generateKey(clientToken: MiniGameClientToken, promoId: MiniGamePromoId, headers: object) {
        const request = await fetch('https://api.gamepromo.io/promo/create-code', {
            method: "POST",
            headers : {...this._defaultHeaders, ...headers, 'Authorization': `Bearer ${clientToken}`},
            body: JSON.stringify({ promoId: promoId })
        });
        const response = await request.json() as { promoCode: MiniGamePromoId }
        return response.promoCode
    }
}