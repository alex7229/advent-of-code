import { FindArraySum } from '../../../utils';

export interface CheckInput {
  (input: string): boolean;
}

interface CalculateCaptcha {
  (input: string, findArraySum: FindArraySum): number;
}

interface SolveFirstPart {
  (
    input: string,
    calculateCaptcha: CalculateCaptcha,
    checkInput: CheckInput,
    findArraySum: FindArraySum
  ): number;
}

export const checkInput: CheckInput = (input) => {
  return /^[\d]+$/.test(input);
};

export const calculateCaptcha: CalculateCaptcha = (input, findArraySum) => {
  const regExp: RegExp = /([\d])\1+/g;
  const match: RegExpMatchArray | null = input.match(regExp);
  if (match === null) {
    // no similar digits at all
    return 0;
  }
  return findArraySum(
    match.map((digitsMatch) => {
      const digit: number = parseInt(digitsMatch[0], 10);
      return digit * (digitsMatch.length - 1);
    })
  );
};

export const solveFirstPart: SolveFirstPart = (input, calculateCaptchaFunc, checkInputFunc, findArraySum) => {
  if (!checkInputFunc(input)) {
    throw new Error('Only numbers should be in the input');
  }
  input = input + input[0];
  return calculateCaptchaFunc(input, findArraySum);
};