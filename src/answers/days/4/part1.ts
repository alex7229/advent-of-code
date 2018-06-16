import { splitByRows, SplitByRows } from '../../../utils';

interface FindWords {
  (input: string): string[];
}

interface IsPhraseValid {
  (input: string[]): boolean;
}

interface CountValidPhrases {
  (
    input: string,
    splitByRows: SplitByRows,
    isPhraseValid: IsPhraseValid,
    findWords: FindWords
  ): number;
}

export const findWords: FindWords = (input) => input.split(' ');

export const isPhraseValid: IsPhraseValid = (input) => {
  let valid = true;
  for (let first = 0; first < input.length - 1; first ++) {
    for (let second = first + 1; second < input.length; second ++) {
      if (input[first] === input[second]) {
        valid = false;
      }
    }
  }
  return valid;
};

export const countValidPhrases: CountValidPhrases = (input, splitByRowsFunc, isPhraseValidFunc, findWordsFunc) =>
  splitByRowsFunc(input)
    .map(row => findWordsFunc(row))
    .filter(phrase => isPhraseValidFunc(phrase))
    .length;

export const day4Part1Factory = (input: string) =>
  countValidPhrases(input, splitByRows, isPhraseValid, findWords);