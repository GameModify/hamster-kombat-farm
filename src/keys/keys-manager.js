
    const { randomUUID } = require('node:crypto');

    const APP_TOKEN = 'd28721be-fd2d-4b45-869e-9f253b554e50'
    const PROMO_ID = '43e35910-c168-4634-ad4f-52fd764a843f'
    const EVENTS_DELAY = 20000

    function generateClientId() {
        const timestamp = Date.now();
        const randomNumbers = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join('');
        return `${timestamp}-${randomNumbers}`;
    }

    function delayRandom() {return (Math.random()/3 + 1)}

    async function login(clientId) {
        if(!clientId) { throw new Error('no client id') }

        const request = await fetch('https://api.gamepromo.io/promo/login-client', {
            headers : {
                'content-type': 'application/json; charset=utf-8',
                'Host': 'api.gamepromo.io'
            },
            method: 'POST',
            body: JSON.stringify({ appToken: APP_TOKEN, clientId: clientId, clientOrigin: 'deviceid'})
        });
        const {clientToken} = await request.json();
        console.log(`Got client token: ${clientToken}`)
        return clientToken
    }

    async function emulateProgress(clientToken) {
        if (!clientToken) { throw new Error('no access token') }

        const request = await fetch("https://api.gamepromo.io/promo/register-event", {
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'Host': 'api.gamepromo.io',
                'Authorization': `Bearer ${clientToken}`
            },
            method: 'POST',
            body: JSON.stringify({promoId: PROMO_ID, eventId: randomUUID(), eventOrigin: 'undefined'})
        });
        const { hasCode } = await request.json();
        return hasCode
    }



    function initProgress() {
        const delays = 6
        const progressPerDelay = 20
        let totalProgress = progressPerDelay * delays
        let curProgress = 0
        async function progressDelay(unexpected = null) {
            if (unexpected) {totalProgress += progressPerDelay}
            const delay = EVENTS_DELAY * delayRandom()
            const delayInterval = delay / progressPerDelay
            for (let i = 0; i < progressPerDelay; i++) {
                curProgress++
                await new Promise(res => setTimeout(res, delayInterval))
            }
        }
        return progressDelay
    }

    async function main() {
        console.log("Start")
        const keys = []
        console.log("Start generating! Wait...")
        while (keys.length < 13) {
            const token = await login(generateClientId())
            const progressDelay = initProgress();
            for (let i = 0; i < 7; i++) {
                await progressDelay(i >= 5)
                if (await emulateProgress(token)) break;
            }
            const key = await generateKey(token)
            console.log('Generated key:', key)
            keys.push(key)
            await progressDelay()
        }
        console.log("Code gen end! Codes: ")

        for (let key of keys) {
            console.log(key)
        }
    }

    main().then(null)

