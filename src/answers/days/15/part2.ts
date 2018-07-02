import { compareNumbers, getMatchesNumber, GetNextNumber, parseInput } from './part1';

export const getNextNumber: GetNextNumber = (previousNumber, multiplier, divisor) => {
  if (divisor === undefined) {
    throw new Error('divisor should be defined');
  }
  let nextNumber = previousNumber;
  do {
    nextNumber = (nextNumber * multiplier) % 2147483647;
  } while (nextNumber % divisor !== 0);
  return nextNumber;
};

export const day15Part2Factory = (input: string, sequenceLength = 5 * 10 ** 6) => {
  const generators = parseInput(input);
  generators.A.multiplier = 16807;
  generators.B.multiplier = 48271;
  generators.A.divisor = 4;
  generators.B.divisor = 8;
  return getMatchesNumber(generators, sequenceLength, compareNumbers, getNextNumber);
};