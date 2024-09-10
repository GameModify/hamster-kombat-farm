import {MiniGameKey} from "../entities";



export type MiniGameGeneratorData = any

interface IGameKeyGenerator {
    generateKey(data: MiniGameGeneratorData): Promise<MiniGameKey | undefined>;
}

interface IPrivateKeyGenerator {
    _generateKey(data: MiniGameGeneratorData): Promise<MiniGameKey | undefined>;
}

export abstract class AbstractGenerator
    implements IGameKeyGenerator {

    async generateKey(data: MiniGameGeneratorData): Promise<MiniGameKey | undefined> {
        this._generateKey()

        return
    }
}


