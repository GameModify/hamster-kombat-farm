import {PrismaClient} from '@prisma/client'

export class DBManager {
    protected prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }
}