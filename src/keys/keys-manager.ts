import {MiniGameKey, MiniGames, MiniGamesKeysRequest, MiniGamesKeysResult} from "./entities";
import {DBKeysManager} from "./db-keys";
import {PrismaClient} from "@prisma/client";


export class MiniGamesKeysGeneratorManager {
    dbManager: DBKeysManager
    prisma: PrismaClient

    constructor() {
        this.dbManager = new DBKeysManager();
        this.prisma = new PrismaClient()

    }

    async tick() : Promise<boolean> {
        // todo: Get keys request from db and generate
        // todo: return false if not need generate keys
        return false
    }
    // todo: Вообще мы можем взять функцию get_keys_for_telegram_id из db-keys и чуть её изменить, но тебя не было, я решил пока что не доделывать
    async getMiniGamesKeys(miniGamesKeysRequest: MiniGamesKeysRequest): Promise<MiniGamesKeysResult>  {
        let keysResult: MiniGamesKeysResult = []
        for (const request of miniGamesKeysRequest) {
            const miniGameId = request.miniGame as number
            let needKeysCount =+ request.count

            const keys = await this.prisma.mini_game_keys.findMany({
                where: {
                    mini_game_id: miniGameId,
                    clients: {
                        telegram_id: telegramID
                    }
                }
            });
            if (keys.length >= needKeysCount) {
                const formattedKeys = keys.slice(0, request.count).map(key => ({
                    id: key.id,
                    mini_game_id: key.mini_game_id as MiniGames,
                    count: request.count,
                    keys: keys.map(k => ({
                        miniGame: k.mini_game_id as MiniGames,
                        value: k.value,
                    })),
                }));
                keysResult = keysResult.concat(formattedKeys);
            } else {
                const foundKeys = keys.map(key => ({
                    id: key.id,
                    mini_game_id: key.mini_game_id as MiniGames,
                    count: keys.length,
                    keys: keys.map(k => ({
                        miniGame: k.mini_game_id as MiniGames,
                        value: k.value,
                    })),
                }));
                keysResult = keysResult.concat(foundKeys);

                // Записываем недостающее количество ключей в таблицу mini_game_keys_requests
                const missingKeysCount = request.count - keys.length;
                await this.prisma.mini_game_keys_requests.create({
                    data: {
                        mini_game_id: miniGameId,
                        count: missingKeysCount,
                    }
                })
            }
        }

        return keysResult
    }

    // todo: Здесь тож нужен tg id надо его откуда то брать, я хочу спать, так что сделай
    async markKeyAsUsed(miniGameKey: MiniGameKey, isUsedSuccessful: boolean) {
        if (isUsedSuccessful == true) {
            await this.prisma.mini_game_keys.deleteMany({
                where: {
                    mini_game_id: miniGameKey.miniGame,
                    value: miniGameKey.value,
                }
            });
        } else {
            await this.prisma.mini_game_keys_requests.create({
                data: {
                    mini_game_id: miniGameKey.miniGame,
                    count: 1,
                },
            })
        }
        return
    }

    static checkNeedGeneration(keysRequests: MiniGamesKeysRequest, keysResult: MiniGamesKeysResult) : boolean {
        if (keysRequests.length !== keysResult.length) return true
        for (let i = 0; i < keysRequests.length; i++) {
            let miniGameKeys = keysResult.filter((element) => {element.mini_game_id = keysRequests[i].miniGame})
            if (!miniGameKeys || miniGameKeys.length !== keysRequests[i].count) return true
        }
        return false
    }
}
``

