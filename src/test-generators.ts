import {DBManager} from "./db/db-manager"
import {MiniGameKeysRequest, MiniGames} from "./keys/entities";
import {MiniGamesKeysGeneratorManager} from "./keys/keys-manager";
import {sleep} from "./utils";


class TestGeneratorsApp {

    private readonly _dbManager: DBManager;
    private readonly _miniGamesKeysGeneratorManager: MiniGamesKeysGeneratorManager;

    constructor() {
        this._dbManager = new DBManager()
        this._miniGamesKeysGeneratorManager = new MiniGamesKeysGeneratorManager()
    }

    async start() {
        console.log("start")

        const gameKeysRequest : Array<MiniGameKeysRequest> = [
            {count: 5, miniGame: MiniGames.Cube}
        ]
        const miniGamesKeys = await this._miniGamesKeysGeneratorManager.getMiniGamesKeys(gameKeysRequest)
        console.log("got keys: ", miniGamesKeys)
        if (!MiniGamesKeysGeneratorManager.checkNeedGeneration(gameKeysRequest, miniGamesKeys)) {
            console.log("all keys available. mark as used and exit")
            for (let miniGameKeys of miniGamesKeys) {
                for (let key of miniGameKeys.keys) {
                    await this._miniGamesKeysGeneratorManager.markKeyAsUsed(key, true)
                }
            }
            return
        }

        while (!await this._miniGamesKeysGeneratorManager.tick()) {await sleep(1000)}

    }
}

new TestGeneratorsApp().start().then()