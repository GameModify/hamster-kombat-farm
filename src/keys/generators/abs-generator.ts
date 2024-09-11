import {MiniGameGeneratorData, MiniGameKey, MiniGames} from "../entities";
import {GeneratorKeysApi} from "../api";
import {getLogger, sleep} from "../../utils";
import {MiniGameClientToken, MiniGameAppToken, MiniGamePromoId} from "../entities";

export abstract class AbstractGenerator {
    protected abstract miniGame: MiniGames;
    protected abstract APP_TOKEN: MiniGameAppToken;
    protected abstract PROMO_ID: MiniGamePromoId;

    protected _api: GeneratorKeysApi
    protected _gameHeaders: object
    public logger = getLogger()
    public sleepTimeMs: number = 10000

    protected abstract _getToken(): Promise<MiniGameClientToken>
    protected abstract _generateKey(): Promise<MiniGameKey>
    protected abstract _emulateProgress(clientToken: MiniGameClientToken): Promise<boolean>

    constructor(gameHeaders: object) {
        this._gameHeaders = gameHeaders
        this._api = new GeneratorKeysApi()
    }

    async generateKey(data: MiniGameGeneratorData): Promise<MiniGameKey> {
        let keyAvailable = false
        const token = await this._getToken()
        while (!keyAvailable) {
            this.logger.log("sleep, key not available")
            await sleep(this.sleepTimeMs);
            keyAvailable = await this._emulateProgress(token)
        }
        return await this._generateKey()
    }
}
