

export type GameClientId = string
export type GameAppToken = string
export type GamePromoId = string

export type KeyGeneratedCallback = (gameKey: GameKey) => Promise<void>;

export declare type GameKeysInfo = {
    id: number
    gameAppToken: GameAppToken
    gamePromoId: GamePromoId
    name: string
}

export declare type GameKeysRequest = {
    gameInfo: GameKeysInfo
    count: number
}

export type GameKey = {
    value: string
    gameInfo: GameKeysInfo
    timestamp: number
}

export declare type AccountInfo = {
    telegramID: number
    cookie: object
    headers: object
}