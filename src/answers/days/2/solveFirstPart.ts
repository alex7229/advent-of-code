import { SplitByRows } from '../../../utils';

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

interface SolveFirstPart {
  (
    input: string,
    functions: {
      parseInput: ParseInput;
      checkParsedNumbers: CheckParsedNumbers;
      calculateAnswer: CalculateAnswer;
      splitByRows: SplitByRows;
      parseRow: ParseRow;
    }
  ): number;
}

export const parseRow: ParseRow = (input) => {
  const stringNumbers: string[] = input.split('\t');
  return stringNumbers.map((stringNumber) => {
    return parseInt(stringNumber, 10);
  });
};

export const parseInput: ParseInput = (input, splitByRows, parseRowFunc) => {
  return splitByRows(input).map(row => {
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

export const solveFirstPart: SolveFirstPart = (input, functions) => {
  const data: number[][] = functions.parseInput(input, functions.splitByRows, functions.parseRow);
  if (!functions.checkParsedNumbers(data)) {
    throw new Error('input should be only from numbers. It`s incorrect');
  }
  return functions.calculateAnswer(data);
};