import { splitByRows } from '../../../utils';
import { countValidPhrases, findWords, isPhraseValid } from './part1';
import * as _ from 'lodash';

interface LettersCount {
  [key: string]: number;
}

interface GetLettersCount {
  (input: string): LettersCount;
}

interface IsEqual {
  (first: LettersCount, second: LettersCount): boolean;
}

interface IsSimilar {
  (first: string, second: string, getLettersCount: GetLettersCount, isEqual: IsEqual): boolean;
}

export const getLettersCount: GetLettersCount = (input) => {
  let count: LettersCount = {};
  for (const letter of input) {
    if (count[letter]) {
      count[letter] = count[letter] + 1;
      continue;
    }
    count[letter] = 1;
  }
  return count;
};

export const isSimilar: IsSimilar = (first, second, getLettersCountFunc, isEqualFunc) =>
  isEqualFunc(getLettersCountFunc(first), getLettersCountFunc(second));

const isSimilarFactory = (first: string, second: string) =>
  isSimilar(first, second, getLettersCount, _.isEqual);

export const day4Part2Factory = (input: string) =>
  countValidPhrases(input, splitByRows, isPhraseValid, findWords, isSimilarFactory);