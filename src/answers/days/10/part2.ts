import { getList, hashFactory, HashFactory } from './part1';

interface ConvertToAscii {
  (input: string): number[];
}

interface ConvertToHex {
  (list: number[]): string;
}

interface AddLengths {
  (lengths: number[]): number[];
}

interface Hash64Times {
  (list: number[], hash: HashFactory, lengths: number[]): number[];
}

interface PerformXor {
  (list: number[]): number;
}

interface GetDenseHash {
  (list: number[], size: number, performXor: PerformXor): number[];
}

interface Hash64TimesFactory {
  (list: number[], lengths: number[]): number[];
}

interface GetDenseHashFactory {
  (list: number[], size: number): number[];
}

export const convertToAscii: ConvertToAscii = input =>
  input
    .split('')
    .map((char) => char.charCodeAt(0));

export const convertToHex: ConvertToHex = list =>
  list
    .map(currentNumber => currentNumber.toString(16).padStart(2, '0'))
    .join('');

export const addLengths: AddLengths = lengths => [...lengths, 17, 31, 73, 47, 23];

export const hash64Times: Hash64Times = (list, hashFunc, lengths) => {
  let skip = 0;
  let position = 0;
  let currentList = [...list];
  for (let i = 0; i < 64; i++) {
    const hashResult = hashFunc(currentList, lengths, skip, position);
    skip = hashResult.skip;
    position = hashResult.position;
    currentList = hashResult.list;
  }
  return currentList;
};

export const performXor: PerformXor = list =>
  // tslint:disable-next-line no-bitwise
  list.reduce((result, currentNumber) => result ^ currentNumber);

export const getDenseHash: GetDenseHash = (list, size, performXorFunc) => {
  let denseHash = [];
  for (let i = 0; i + size <= list.length; i += size) {
    let listPart = [];
    for (let j = i; j < i + size; j++) {
      listPart.push(list[j]);
    }
    denseHash.push(performXorFunc(listPart));
  }
  return denseHash;
};

const hash64TimesFactory: Hash64TimesFactory = (list, lengths) =>
  hash64Times(list, hashFactory, lengths);

const getDenseHashFactory: GetDenseHashFactory = (list, size) =>
  getDenseHash(list, size, performXor);

export const day10Part2Factory = (input: string) => {
  const lengths = convertToAscii(input);
  const extendedLengths = addLengths(lengths);
  const list = getList(256);
  const hashedList = hash64TimesFactory(list, extendedLengths);
  const denseHash = getDenseHashFactory(hashedList, 16);
  return convertToHex(denseHash);
};