import { PrismaClient } from '@prisma/client'
import {MiniGameKey, MiniGameKeysResult, MiniGamesKeysResult} from "../keys/entities";

class DBManager {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    getAccountInfoFromTelegramID() {
        return {}
    }

    async getKeysForTelegramID(telegramID: number): Promise<MiniGamesKeysResult> {
        let result: MiniGamesKeysResult = [];

        // Получаем ключи, связанные с определенным telegramID
        const keys = await this.prisma.keys.findMany({
            where: {
                clients: {
                    telegram_id: telegramID  // Проверяем по telegramID
                }
            },
            select: {
                id: true,
                value: true,
                timestamp: true,
                is_used: true,
                games: {
                    select: {
                        id: true,
                        name: true,
                        app_token: true,
                        promo_value: true
                    }
                }
            }
        });

        // итеррируемся по найденным ключам и собираем результат
        for (let key of keys) {
            const miniGameKey: MiniGameKey = {
                id: key.id,
                value: key.value,
                timestamp: key.timestamp,
                is_used: key.is_used
            };

            // Проверяем, добавлена ли игра в результат
            let gameEntry = result.find(entry => entry.gameId === key.games.id);
            if (!gameEntry) {
                gameEntry = {
                    gameId: key.games.id,
                    gameName: key.games.name,
                    keys: []
                };
                result.push(gameEntry);
            }

            // Добавляем ключ в соответствующую игру
            gameEntry.keys.push(miniGameKey);
        }

        return result;
    }
}

async function main() {
    const dbManager = new DBManager()
    const telegramID = 11111
    const result = await dbManager.getKeysForTelegramID(telegramID)
    console.log( 'Ключи для телеграм ID: ', telegramID, JSON.stringify(result, null, 1))
}

export {DBManager}


main().then()