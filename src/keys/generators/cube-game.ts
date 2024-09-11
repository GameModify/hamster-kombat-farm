import {MiniGameClientToken} from "../entities";
import {MiniGameKey, MiniGames} from "../entities";
import {AbstractGenerator} from "./abs-generator";
import {generateClientId} from "../../utils";

export class CubeGame extends AbstractGenerator {

    protected miniGame: MiniGames = MiniGames.Cube;

    // todo: update promo and token
    protected PROMO_ID: string = "NEED UPDATE";
    protected APP_TOKEN: string = "NEED UPDATE";

    protected _getToken(): Promise<MiniGameClientToken> {
        // todo: check client id and headers
        return this._api.getToken(generateClientId(), this.APP_TOKEN, {...this._gameHeaders});
    }

    protected _generateKey(): Promise<MiniGameKey> {
        const key: MiniGameKey = {miniGame: this.miniGame, value: ""};
        throw new Error("Method not implemented.");
    }

    protected _emulateProgress(clientToken: MiniGameClientToken): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}