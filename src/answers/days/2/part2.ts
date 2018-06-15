import { checkParsedNumbers, CheckParsedNumbers, parseInputFactory } from './part1';

interface ParseInput {
  (input: string): number[][];
}

interface Part2 {
  (
    input: string,
    functions: {
      parseInput: ParseInput,
      checkParsedNumbers: CheckParsedNumbers,
      findEvenDivision: FindEvenDivision,
      findAllPairs: FindAllPairs,
      calculateAnswer: CalculateAnswer
    }
  ): number;
}

interface FindAllPairs {
  (input: number[]): [number, number][];
}

interface FindEvenDivision {
  (input: [number, number][]): number;
}

interface CalculateAnswer {
  (rows: number[][], findEvenDivision: FindEvenDivision, findAllPairs: FindAllPairs): number;
}

export const findAllPairs: FindAllPairs = (input) => {
  let pairs: [number, number][] = [];
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      pairs.push([input[i], input[j]]);
    }
  }
  return pairs;
};

export const findEvenDivision: FindEvenDivision = (input) => {
  // if no division - filter can return empty array
  const divisiblePairs =  input
    .filter(([ firstNumber, secondNumber ]) =>
      (firstNumber % secondNumber) === 0 || (secondNumber % firstNumber) === 0);
  if (divisiblePairs.length !== 1) {
    throw new Error ('There are either no divisible numbers in that row, or more than one pair');
  }
  const [first, second] = divisiblePairs[0];
  return first > second ? first / second : second / first;
};

export const calculateAnswer: CalculateAnswer = (
  rows,
  findEvenDivisionFunc,
  findAllPairsFunc
): number => {
  return rows
    .map(row => findEvenDivisionFunc(findAllPairsFunc(row)))
    .reduce((total, current) => total + current);
};

export const solveSecondPart: Part2 = (
  input,
  functions
) => {
  const numbers = functions.parseInput(input);
  if (!functions.checkParsedNumbers(numbers)) {
    throw new Error( 'Input is incorrect. It should consist only from numbers');
  }
  return functions.calculateAnswer(numbers, functions.findEvenDivision, functions.findAllPairs);
};

export const day2Part2Factory = (input: string) =>
  solveSecondPart(input, {
    checkParsedNumbers: checkParsedNumbers,
    calculateAnswer,
    findEvenDivision,
    findAllPairs,
    parseInput: parseInputFactory
  });