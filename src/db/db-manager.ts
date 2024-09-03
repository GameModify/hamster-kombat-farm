import { PrismaClient } from '@prisma/client'
import {MiniGameKey, MiniGameKeysResult, MiniGamesKeysResult} from "../keys/entities";

class DBManager {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient()
    }

    getAccountInfoFromTelegramID () {
        return {}
    }
    
    async getKeysForTelegramID (telegramID: number) : Promise<MiniGamesKeysResult> {
        let result: MiniGamesKeysResult = []
        const games = await this.prisma.keys.findMany()
        for (let game of games) {
            let keys : Array<MiniGameKey> = []
            const res= await this.prisma.keys.findMany({
                where: {
                    keys: {
                        id: game.id
                    },
                    clients: {
                        telegram_id : 1
                    }
                },
                include :{
                    clients: {
                        where: {
                            telegram_id : 1
                        }
                    }
                }
            })
            const miniGameKeysResult: MiniGameKeysResult = {gameId: game.game_id, keys: ["kjh"]}
            console.log(res)
            result.push(miniGameKeysResult)
        }
        return result
    }
}

export { DBManager }

async function main(){
    const dbManager = new DBManager()
    const telegramID = 11111
    const result = await dbManager.getKeysForTelegramID(telegramID)
    console.log(result)

}

main().then()