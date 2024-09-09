
interface IGameKeyGenerator {
    sum: (num1: number, num2: number ) => number;
}

export abstract class AbstractGenerator
    implements IGameKeyGenerator {
    sum(num: number): number {return 1}


}

