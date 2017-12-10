import { checkInput } from '../part_1/getAnswer';

interface ComparingPair {
    firstPosition: number;
    secondPosition: number;
}

const findComparingPairs = (input: string): ComparingPair[] => {
    let ComparingPairsList: ComparingPair[] = [];
    const halfwayAround = input.length / 2;
    for (let i = 0; i < input.length; i++) {
        const firstPosition: number = i;
        let secondPosition: number = i + halfwayAround;
        if (secondPosition >= input.length) {
            secondPosition =  secondPosition - input.length;
        }
        ComparingPairsList.push({
            firstPosition,
            secondPosition
        });
    }
    return ComparingPairsList;
};

const calculateCaptcha = (input: string): number => {
    const pairs: ComparingPair[] = findComparingPairs(input);
    return pairs.map(({firstPosition, secondPosition}) => {
        const firstNumber = parseInt(input[firstPosition], 10);
        const secondNumber = parseInt(input[secondPosition], 10);
        if (firstNumber === secondNumber) {
            return firstNumber;
        }
        return 0;
    }).reduce((total, current) => {
        return current + total;
    });
};

const getAnswer = (input: string): string => {
    if (!checkInput(input)) {
        return 'Only numbers should be in the input';
    }
    return calculateCaptcha(input).toString();
};

export { getAnswer };