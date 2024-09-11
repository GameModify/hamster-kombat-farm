import {MiniGameClientId} from "./keys/entities";
import {Console} from "node:console";

export const sleep = (delayMs: number) : Promise<void> => {return new Promise(res => setTimeout(res, delayMs))}

export function generateClientId() : MiniGameClientId {
    const timestamp = Date.now();
    const randomNumbers = Array.from({length: 19}, () => Math.floor(Math.random() * 10)).join('');
    return `${timestamp}-${randomNumbers}`;
}

export function getLogger() : Console {
    const console_ = new Console({ stdout: process.stdout, stderr: process.stderr })
    return console_
}