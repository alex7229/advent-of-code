interface Reverse {
  (list: number[], length: number, position: number): number[];
}

interface GetNextPosition {
  (currentPosition: number, skipSize: number, length: number, list: number[]): number;
}

interface Hash {
  (list: number[], reverse: Reverse, lengths: number[], getNextPosition: GetNextPosition): number[];
}

interface GetLengths {
  (input: string): number[];
}

interface GetList {
  (size: number): number[];
}

export const reverse: Reverse = (list, length, position) => {
  if (length === 0 || length === 1) {
    return [...list];
  }
  const doubleList = [...list, ...list];
  const to = position + length;
  let firstPart = doubleList.slice(0, position);
  const reversedPart = doubleList
    .slice(position, to)
    .reverse();
  let lastPart = doubleList.slice(to);
  const doubleListReversed = [...firstPart, ...reversedPart, ...lastPart];
  if (to < list.length) {
    return doubleListReversed.slice(0, list.length);
  }
  firstPart = doubleListReversed.slice(list.length, to);
  lastPart = doubleListReversed.slice(to - list.length, list.length);
  return [...firstPart, ...lastPart];
};

export const getNextPosition: GetNextPosition = (currentPosition, skipSize, length, list) =>
  (currentPosition + skipSize + length) % list.length;

export const hash: Hash = (list, reverseFunc, lengths, getNextPositionFunc) => {
  let skip = 0;
  let position = 0;
  let currentList = [...list];
  for (const length of lengths) {
    currentList = reverseFunc(currentList, length, position);
    position = getNextPositionFunc(position, skip, length, currentList);
    skip++;
  }
  return currentList;
};

export const getLengths: GetLengths = input => {
  const numbers = input
    .split(',')
    .map(possibleNumber => parseInt(possibleNumber, 10));
  const inputCorrect =
    numbers.every(possibleNumber => !Number.isNaN(possibleNumber)) &&
    numbers.length > 0;
  if (!inputCorrect) {
    throw new Error('input is incorrect');
  }
  return numbers;
};

export const getList: GetList = size => {
  let list: number[] = [];
  for (let i = 0; i < size; i++) {
    list.push(i);
  }
  return list;
};

export const day10Part1Factory = (input: string) => {
  const lengths = getLengths(input);
  const list = getList(256);
  const mixedList = hash(list, reverse, lengths, getNextPosition);
  return mixedList[0] * mixedList[1];
};