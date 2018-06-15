import { splitByRows, SplitByRows } from '../../../utils';

interface ParseRow {
  (input: string): number[];
}

export interface ParseInput {
  (input: string, splitByRows: SplitByRows, parseRow: ParseRow): number[][];
}

export interface CheckParsedNumbers {
  (numbers: number[][]): boolean;
}

interface CalculateAnswer {
  (rows: number[][]): number;
}

export interface ParseInputFactory {
  (input: string): number[][];
}

interface Day2Part1 {
  (
    input: string,
    functions: {
      parseInput: ParseInputFactory;
      checkParsedNumbers: CheckParsedNumbers;
      calculateAnswer: CalculateAnswer;
    }
  ): number;
}

export const parseRow: ParseRow = (input) => {
  const stringNumbers: string[] = input.split('\t');
  return stringNumbers.map((stringNumber) => {
    return parseInt(stringNumber, 10);
  });
};

export const parseInput: ParseInput = (input, splitByRowsFunc, parseRowFunc) => {
  return splitByRowsFunc(input).map(row => {
    return parseRowFunc(row);
  });
};

export const checkParsedNumbers: CheckParsedNumbers = (numbers) => {
  return numbers.every((row) => {
    return row.every((currentNumber => {
      return !Number.isNaN(currentNumber);
    }));
  });
};

export const calculateAnswer = (rows: number[][]): number => {
  return rows.map(row => {
    const max = Math.max(...row);
    const min = Math.min(...row);
    return max - min;
  }).reduce((total, current) => {
    return total + current;
  });
};

export const part1: Day2Part1 = (input, functions) => {
  const data: number[][] = functions.parseInput(input);
  if (!functions.checkParsedNumbers(data)) {
    throw new Error('input should be only from numbers. It`s incorrect');
  }
  return functions.calculateAnswer(data);
};

export const parseInputFactory: ParseInputFactory = (input) =>
  parseInput(input, splitByRows, parseRow);

export const day2Part1Factory = (input: string) =>
  part1(input, {parseInput: parseInputFactory, calculateAnswer, checkParsedNumbers});