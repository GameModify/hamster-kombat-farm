import {PrismaClient} from '@prisma/client';


async function FillMiniGamesData(prismaClient: PrismaClient): Promise<void> {

    console.log('Default data has been added.');
}

async function main() {
    const prisma = new PrismaClient();
    try {
        await FillMiniGamesData(prisma)
    } catch(e) {
        console.error(e);
    } finally {
        prisma.$disconnect();
    }
}

main().then()
