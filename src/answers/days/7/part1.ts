import { splitByRows, SplitByRows } from '../../../utils';

export interface InformationPart {
  name: string;
  holds: string[];
  weight: number;
}

export interface Information {
  [key: string]: {
    weight: number,
    holds: string[]
  };
}

interface ParseLine {
  (line: string): InformationPart;
}

interface GetInformation {
  (input: string, parseLine: ParseLine, splitByRows: SplitByRows): Information;
}

interface FindRootTower {
  (information: Information): string;
}

export const parseLine: ParseLine = line => {
  const regExp = /([a-z]+) \(([\d]+)\)(?: -> ([\w, ]+))?/;
  const match = line.match(regExp);
  if (match === null) {
    throw new Error(`line "${line}" was not parsed`);
  }
  const [, name, weightMatch, holdsMatch] = match;
  const weight = parseInt(weightMatch, 10);
  const holds = holdsMatch ? holdsMatch.split(', ') : [];
  return { name, weight, holds};
};

export const getInformation: GetInformation = (input, parseLineFunc, splitByRowsFunc) => {
  const informationParts = splitByRowsFunc(input)
    .map(row => parseLineFunc(row));
  let information: Information = {};
  for (const part of informationParts) {
    information[part.name] = { weight: part.weight, holds: part.holds };
  }
  return information;
};

export const findRootTower: FindRootTower = (information => {
  let root: string | null = null;
  const entries = Object.entries(information);
  for (const [name] of entries) {
    const otherTowersValues = entries
      .filter(currentEntry => currentEntry[0] !== name)
      .map(currentEntry => currentEntry[1]);
    const towerIsInList = otherTowersValues
      .find(currentValue => currentValue.holds.includes(name));
    if (towerIsInList !== undefined) {
      continue;
    }
    if (root !== null) {
      throw new Error('multiple roots');
    }
    root = name;
  }
  if (root === null) {
    throw new Error('no root at all');
  }
  return root;
});

export const day7Part1Factory = (input: string) =>
  findRootTower(getInformation(input, parseLine, splitByRows));