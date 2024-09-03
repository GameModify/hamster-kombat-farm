// import { cfg } from "./configs.js"
// import { DbManager } from "./db/db-manager.ts"
// // import { KeyGenerator } from "./keys/keys-manager.js"
// import { RequestsManager } from "./request-manager.js"
// import { Game } from "./game.js"



import {generateClientId, sleep} from "./utils";
import {GeneratorKeysApi} from "./keys/api";
import {GameClientId, GameKey, GameKeysInfo, GameKeysRequest, KeyGeneratedCallback} from "./entities";


class App {

    _activeAccounts = []

    constructor() {
        // this.dbManager = new DbManager()
        // this.keyGenerator = new KeyGenerator(this.dbManager)
        // this.requestsManager = new RequestsManager(this.dbManager)
        // this.game = new Game()
    }

    async start() {
        console.log("start")
        const api = new GeneratorKeysApi()

        const clientId: GameClientId = 'd28721be-fd2d-4b45-869e-9f253b554e50:deviceid:1725056593709-5104638609976827085:8BXcQIO8Bq6:1725056559877'
        const gameInfo: GameKeysInfo = {gameAppToken: '82647f43-3f87-402d-88dd-09a90025313f', gamePromoId: 'c4480ac7-e178-4973-8061-9ed5b2e17954', id: 0, name: "Mow"}
        const gameKeysRequest : Array<GameKeysRequest> = [
            {count: 5, gameInfo: gameInfo}
        ]

        await api.generateKeys(gameKeysRequest, this.writeKeyForDB)

        // while (true) {
        //     try {
        //         if (this.#activeAccounts.length < cfg.maxActiveAccountsCount)
        //         await sleep(1)
        //
        //
        //     } catch (error) {
        //         console.error(error)
        //         break
        //     }
        // }

    }

    async writeKeyForDB(gameKey: GameKey) {

        console.log("got key", gameKey.value)
    }
}


new App().start().then()
