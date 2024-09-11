import {DBManager} from "../db/db-manager";
import {MiniGameKey, MiniGameKeysResult, MiniGames, MiniGamesKeysResult} from "./entities";
import {TelegramID} from "../entities";

export class DBKeysManager extends DBManager {

    async getKeysForTelegramID(telegramID: TelegramID): Promise<MiniGamesKeysResult> {

        // todo: check work and update

        const keys = await this.prisma.mini_game_keys.findMany({
            // where: {account_id: {telegram_id: telegramID}},
            // select: {
            //     value: true,
            //     mini_game_id: true
            // }
        });


        let result: MiniGamesKeysResult = [];

        for (let key of keys) {
            // todo: number to enum, fix MiniGames.TEST
            const miniGame: MiniGames = MiniGames.TEST;

            const miniGameKey: MiniGameKey = {miniGame: miniGame, value: key.value}

            let gameKeys: MiniGameKeysResult[] = result.filter((element) => {element.miniGame = miniGame});
            if (!gameKeys.length) {result.push({keys: [miniGameKey], miniGame: miniGame})}
            else gameKeys[0].keys.push(miniGameKey)
        }

        return result;
    }
}