import { parseInput, checkParsedNumbers } from '../part_1/getAnswer';

const sort = ([firstNumber, secondNumber]: [number, number]): [number, number] => {
    const biggerNumber = Math.max(firstNumber, secondNumber);
    const smallerNumber = Math.min(firstNumber, secondNumber);
    return [ biggerNumber, smallerNumber ];
};

const findAllPairs = (input: number[]): [number, number][] => {
    let pairs: [number, number][] = [];
    for (let i = 0; i < input.length - 1; i++) {
        for (let j = i + 1; j < input.length; j++) {
           pairs.push([input[i], input[j]]);
        }
    }
    return pairs;
};

const findEvenDivision = (input: [number, number][]): number => {
    // if no division - filter can return empty array
    const divisiblePairs =  input
        .map((pair) => {
            return sort(pair);
        })
        .filter(([ firstNumber, secondNumber ]) => {
            return (firstNumber % secondNumber) === 0;
        });
    if (divisiblePairs.length !== 1) {
        throw new Error ('There are either no divisible numbers in that row, or more than one pair');
    }
    return divisiblePairs[0][0] / divisiblePairs[0][1];
};

const calculateAnswer = (rows: number[][]): number => {
    return rows .map((row) => {
        const allPairs = findAllPairs(row);
        return findEvenDivision(allPairs);
    }).reduce((total, current) => {
        return total + current;
    });
};

const getAnswer = (input: string): string => {
    const numbers = parseInput(input);
    if (!checkParsedNumbers(numbers)) {
        return 'Input is incorrect. It should consist only from numbers';
    }
    try {
        return calculateAnswer(numbers).toString();
    } catch (error) {
        return error.message;
    }
};

export { getAnswer };