import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    let games = await prisma.games.create({
        data: {
            name: 'Train Miner',
            app_token: '82647f43-3f87-402d-88dd-09a90025313f',
            promo_value: 'c4480ac7-e178-4973-8061-9ed5b2e17954'
        },
    })

    //Вывод всех игр
    let gamest = await prisma.games.findMany()
    console.log(gamest)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })