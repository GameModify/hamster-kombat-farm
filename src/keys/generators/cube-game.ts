import {MiniGameClientToken} from "../entities";
import {MiniGameKey, MiniGames} from "../entities";
import {AbstractGenerator} from "./abs-generator";

export class CubeGame extends AbstractGenerator {

    protected miniGame: MiniGames = MiniGames.Cube;

    protected PROMO_ID: string = "NEED UPDATE";
    protected APP_TOKEN: string = "NEED UPDATE";

    protected _getToken(): Promise<MiniGameClientToken> {
        throw new Error("Method not implemented.");
    }
    protected _generateKey(): Promise<MiniGameKey> {
        const key: MiniGameKey = {miniGame: this.miniGame, value: ""};
        throw new Error("Method not implemented.");
    }
    protected _emulateProgress(clientToken: MiniGameClientToken): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}