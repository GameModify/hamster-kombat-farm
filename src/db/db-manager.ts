import {PrismaClient} from '@prisma/client'
import {AccountInfo} from "../entities";

export class DBManager {
    protected prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getAvailableAccount() : Promise<Array<AccountInfo>> {
        let accounts: Array<AccountInfo> = []
        // todo: get available accounts from db
        return accounts
    }
}