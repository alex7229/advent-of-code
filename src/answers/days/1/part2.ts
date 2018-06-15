import { checkInput, CheckInput } from './part1';

interface ComparingPair {
  firstPosition: number;
  secondPosition: number;
}

interface FindComparingPairs {
  (input: string): ComparingPair[];
}

interface CalculateCaptcha {
  (input: string): number;
}

interface Day1Part2 {
  (input: string, checkInput: CheckInput, calculateCaptcha: CalculateCaptcha): number;
}

export const findComparingPairs: FindComparingPairs = (input) => {
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

export const calculateCaptcha: CalculateCaptcha = (input) => {
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

export const day1Part2: Day1Part2 = (input, checkInputFunc, calculateCaptchaFunc) => {
  if (!checkInputFunc(input)) {
    throw new Error( 'Only numbers should be in the input');
  }
  return calculateCaptchaFunc(input);
};

export const day1Part2Factory = (input: string) => day1Part2(input, checkInput, calculateCaptcha);