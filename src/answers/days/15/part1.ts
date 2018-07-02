interface GetNextNumber {
  (previousNumber: number, multiplier: number): number;
}

export interface Generators {
  A: { startNumber: number };
  B: { startNumber: number };
}

interface ParseInput {
  (input: string): Generators;
}

interface CompareNumbers {
  (first: number, second: number): boolean;
}

interface GetMatchesNumber {
  (
    generators: Generators,
    sequenceLength: number,
    compareNumbers: CompareNumbers,
    getNextNumber: GetNextNumber
  ): number;
}

export const getNextNumber: GetNextNumber = (previousNumber, multiplier) =>
  (previousNumber * multiplier) % 2147483647;

export const parseInput: ParseInput = input => {
  const regExp = /([\d]+)[^\d]+([\d]+)/;
  const match = input.match(regExp);
  if (match === null) {
    throw new Error('input is incorrect');
  }
  return {
    A: {startNumber: parseInt(match[1], 10)},
    B: {startNumber: parseInt(match[2], 10)}
  };
};

export const compareNumbers: CompareNumbers = (firstNumber, secondNumber) => {
  const firstNumberLastDigits = firstNumber
    .toString(2)
    .padStart(16, '0')
    .slice(-16);
  const secondNumberLastDigits = secondNumber
    .toString(2)
    .padStart(16, '0')
    .slice(-16);
  return firstNumberLastDigits === secondNumberLastDigits;
};

export const getMatchesNumber: GetMatchesNumber = (
  generators,
  sequenceLength,
  compareNumbersFunc,
  getNextNumberFunc
) => {
  let firstNumber = generators.A.startNumber;
  let secondNumber = generators.B.startNumber;
  let matchesNumber = 0;
  if (compareNumbersFunc(firstNumber, secondNumber)) {
    matchesNumber++;
  }
  for (let i = 0; i < sequenceLength; i++) {
    firstNumber = getNextNumberFunc(firstNumber, 16807);
    secondNumber = getNextNumberFunc(secondNumber, 48271);
    if (compareNumbersFunc(firstNumber, secondNumber)) {
      matchesNumber++;
    }
  }
  return matchesNumber;
};

export const day15Part1Factory = (input: string) => {
  const generators = parseInput(input);
  return getMatchesNumber(generators, 4 * 10 ** 7, compareNumbers, getNextNumber);
};
