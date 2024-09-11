export enum MiniGames {
    TEST = 0, Cube
}


export type MiniGameKey = {
    miniGame: MiniGames
    value: string
}

export type MiniGameKeysResult = {
    miniGame: MiniGames
    keys: Array<MiniGameKey>
}

export type MiniGamesKeysResult = Array<MiniGameKeysResult>

export declare type MiniGameKeysRequest = {
    miniGame: MiniGames
    count: number
}

export declare type MiniGamesKeysRequest = Array<MiniGameKeysRequest>


export type MiniGameGeneratorData = {
    appToken: string
    appPromo: string
}

export type MiniGameClientId = string
export type MiniGameAppToken = string
export type MiniGamePromoId = string
export type MiniGameClientToken = string