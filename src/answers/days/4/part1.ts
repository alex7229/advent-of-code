import { splitByRows, SplitByRows } from '../../../utils';

interface FindWords {
  (input: string): string[];
}

interface IsPhraseValid {
  (input: string[], isSimilar: IsSimilar): boolean;
}

interface IsSimilar {
  (first: string, second: string): boolean;
}

interface CountValidPhrases {
  (
    input: string,
    splitByRows: SplitByRows,
    isPhraseValid: IsPhraseValid,
    findWords: FindWords,
    isSimilar: IsSimilar
  ): number;
}

export const findWords: FindWords = (input) => input.split(' ');

export const isPhraseValid: IsPhraseValid = (input, isSimilarFunc) => {
  let valid = true;
  for (let first = 0; first < input.length - 1; first ++) {
    for (let second = first + 1; second < input.length; second ++) {
      if (isSimilarFunc(input[first], input[second])) {
        valid = false;
      }
    }
  }
  return valid;
};

export const isSimilar: IsSimilar = (first, second) => first === second;

export const countValidPhrases: CountValidPhrases = (
  input,
  splitByRowsFunc,
  isPhraseValidFunc,
  findWordsFunc,
  isSimilarFunc
) =>
  splitByRowsFunc(input)
    .map(row => findWordsFunc(row))
    .filter(phrase => isPhraseValidFunc(phrase, isSimilarFunc))
    .length;

export const day4Part1Factory = (input: string) =>
  countValidPhrases(input, splitByRows, isPhraseValid, findWords, isSimilar);