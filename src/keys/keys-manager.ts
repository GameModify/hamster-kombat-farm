import {MiniGameKey, MiniGamesKeysRequest, MiniGamesKeysResult} from "./entities";
import {DBKeysManager} from "./db-keys";


export class MiniGamesKeysGeneratorManager {
    dbManager: DBKeysManager

    constructor() {
        this.dbManager = new DBKeysManager();

    }

    async tick() : Promise<boolean> {
        // todo: Get keys request from db and generate
        // todo: return false if not need generate keys
        return false
    }

    async getMiniGamesKeys(miniGamesKeysRequest: MiniGamesKeysRequest): Promise<MiniGamesKeysResult>  {
        // todo: Send request to database if not available when keys exist

        // todo: if keys exist then return
        let keysResult: MiniGamesKeysResult = []

        return keysResult
    }

    async markKeyAsUsed(miniGameKey: MiniGameKey, isUsedSuccessful: boolean) {
        // todo: if successful then delete key from db
        // todo: else if key is invalid then request to generate new key for next iteration

        return
    }

    static checkNeedGeneration(keysRequests: MiniGamesKeysRequest, keysResult: MiniGamesKeysResult) : boolean {
        if (keysRequests.length !== keysResult.length) return true
        for (let i = 0; i < keysRequests.length; i++) {
            let miniGameKeys = keysResult.filter((element) => {element.miniGame = keysRequests[i].miniGame})
            if (!miniGameKeys || miniGameKeys.length !== keysRequests[i].count) return true
        }
        return false
    }
}


