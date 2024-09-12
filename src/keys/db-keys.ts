import {DBManager} from "../db/db-manager";
import {MiniGameKey, MiniGameKeysResult, MiniGames, MiniGamesKeysResult} from "./entities";
import {TelegramID} from "../entities";

export class DBKeysManager extends DBManager {

    async getKeysForTelegramID(telegramID: TelegramID): Promise<MiniGamesKeysResult> {

        const accountWithKeys  = await this.prisma.accounts.findUnique({
            where: { telegram_id: telegramID },
            select: {
                id: true,
                mini_game_keys: {
                    select: {
                        value: true,
                        mini_game_id: true,
                    },
                },
            },
        });
        let result: MiniGamesKeysResult = [];
        if (!accountWithKeys  || !Array.isArray(accountWithKeys .mini_game_keys)) {
            throw new Error(`Account with telegram_id ${telegramID} not found or keys not found`);
        }
        const keys = accountWithKeys.mini_game_keys
        for (let key of keys) {
            const miniGameID: MiniGames = key.mini_game_id as MiniGames;
            const miniGameKey: MiniGameKey = { miniGame: miniGameID, value: key.value };

            let gameKeys = result.find((element) => element.mini_game_id === miniGameID);
        // todo: Не доконца понимаю что здесь должно быть, а так поиск работает
            if (!gameKeys) {
                result.push({
                    count: 1,
                    mini_game_id: miniGameID,
                    keys: [miniGameKey],
                });
            } else {
                gameKeys.keys.push(miniGameKey);
                gameKeys.count += 1;
            }
        }

        return result;
    }
}


const dbmanager = new DBKeysManager()

dbmanager.getKeysForTelegramID(11111)