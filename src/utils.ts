import {GameClientId} from "./entities";

export const sleep = (delayMs: number) : Promise<void> => {return new Promise(res => setTimeout(res, delayMs))}

export function generateClientId() : GameClientId {
    const timestamp = Date.now();
    const randomNumbers = Array.from({length: 19}, () => Math.floor(Math.random() * 10)).join('');
    return `${timestamp}-${randomNumbers}`;
}