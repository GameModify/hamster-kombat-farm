import {PrismaClient} from '@prisma/client';


async function FillMiniGamesData(prismaClient: PrismaClient): Promise<void> {
    await prismaClient.games.createMany({
        data: {
            name: 'Train Miner',
            app_token: '82647f43-3f87-402d-88dd-09a90025313f',
            promo_value: 'c4480ac7-e178-4973-8061-9ed5b2e17954'
        },
    });

    console.log('Default data has been added.');
}

async function main() {
    const prisma = new PrismaClient();
    await FillMiniGamesData(prisma)
}

main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
