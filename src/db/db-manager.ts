import {PrismaClient} from '@prisma/client'
import {AccountInfo} from "../entities";

export class DBManager {
    protected prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async setNextStartTime(accountInfo: AccountInfo, nextStartTime: number): Promise<void> {
        try {
            await this.prisma.accounts.update({
                where: {
                    telegram_id: accountInfo.telegramID,
                },
                data: {
                    next_start_timestamp: nextStartTime,
                },
            });
            console.log(`Next start time for account ${accountInfo.telegramID} has been updated`);
        } catch (error) {
            console.error('Error updating next start time:', error);
        }
    }

    async getAvailableAccounts(): Promise<AccountInfo[]> {
        const now = Date.now();

        const availableAccounts = await this.prisma.accounts.findMany({
            where: {
                next_start_timestamp: {
                    lt: now,
                },
            },
        });

        return availableAccounts.map(account => ({
            id: account.id,
            telegramID: account.telegram_id,
            username: account.username,
            nextStartTimestamp: account.next_start_timestamp,
            cookie: account.cookie,
            headers: {},
        }));
    }
}