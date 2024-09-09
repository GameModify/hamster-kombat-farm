import {GameKeysInfo} from "../entities";

export type MiniGameKey = {
    id: number
    value: string
    timestamp: Date
    is_used: boolean
}

export type MiniGameID = number;

export type MiniGameKeysResult = {
    gameId: MiniGameID
    gameName: string
    keys: Array<MiniGameKey>
}

export type MiniGamesKeysResult = Array<MiniGameKeysResult>

export declare type MiniGameKeysRequest = {
    gameInfo: GameKeysInfo
    count: number
}

export declare type MiniGamesKeysRequest = Array<MiniGameKeysRequest>
