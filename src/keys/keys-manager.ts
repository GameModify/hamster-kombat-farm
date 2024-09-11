import {DBManager} from "../db/db-manager";
import {MiniGameKey, MiniGamesKeysRequest, MiniGamesKeysResult} from "./entities";
import {PrismaClient} from "@prisma/client";




export class MiniGamesKeysGeneratorManager {
    private prisma: PrismaClient;
    dbManager: DBManager

    constructor(dbManager: DBManager) {
        this.prisma = new PrismaClient()
        this.dbManager = dbManager;

    }

    async tick(){
        // todo: Get keys request from db and generate
        return
    }

    async sendMiniGamesKeysRequest(miniGamesKeysRequest: MiniGamesKeysRequest): Promise<MiniGamesKeysResult>  {
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
}


