import {PrismaClient} from '@prisma/client';


async function FillMiniGamesData(prismaClient: PrismaClient): Promise<void> {
    const prisma = new PrismaClient();
    if (await prisma.accounts.count() == 0){

        await prisma.accounts.createMany({
            data: [{
                telegram_id: 23323232,
                username: "arthur",
                next_start_timestamp: Date.now(),
                cookie: "",
            },
                {
                    telegram_id: 11111,
                    username: "serent",
                    next_start_timestamp: Date.now(),
                    cookie: "",
                }
            ],

        })
        console.log('Default data has been added.')
    } else {
        console.log('Data not empty.')
    }

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
