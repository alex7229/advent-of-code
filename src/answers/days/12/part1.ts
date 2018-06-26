import { splitByRows } from '../../../utils';
import * as _ from 'lodash';

interface Lodash {
  // tslint:disable-next-line no-any
  uniqBy<T>(array: T[], callback?: any): T[];
}

export interface Program {
  id: number;
  connectedIds: number[];
}

interface ParseLine {
  (line: string): Program;
}

interface FindDirectlyConnectedPrograms {
  (ids: number[], programs: Program[], lodash: Lodash): number[];
}

interface FindAllConnectedPrograms {
  (
    ids: number[],
    programs: Program[],
    findDirectlyConnectedPrograms: FindDirectlyConnectedPrograms,
    lodash: Lodash
  ): number[];
}

export interface FindAllConnectedProgramsFactory {
  (ids: number[], programs: Program[]): number[];
}

export const parseLine: ParseLine = line => {
  const regExp = /(\d+) <-> (.+)/;
  const match = line.match(regExp);
  if (match === null) {
    throw new Error(`line ${line} is incorrect`);
  }
  const id = parseInt(match[1], 10);
  if (Number.isNaN(id)) {
    throw new Error(`id in line ${line} is incorrect`);
  }
  const connectedIds = match[2]
    .split(', ')
    .map((numberString) => parseInt(numberString, 10));
  const areNumbersValid = connectedIds.every((currentId) => !Number.isNaN(currentId));
  if (!areNumbersValid) {
    throw new Error(`line ${line} is incorrect`);
  }
  return { id, connectedIds };
};

export const findDirectlyConnectedPrograms: FindDirectlyConnectedPrograms = (ids, programs, lodash) => {
  if (ids.length === 0 || programs.length === 0) {
    throw new Error('params are incorrect');
  }
  const programsWithOwnIds = programs.map(program =>
    ({ id: program.id, connectedIds: [...program.connectedIds, program.id]}));
  const duplicatedIds =  programsWithOwnIds
    .filter(program => ids.includes(program.id))
    .map(program => program.connectedIds)
    .reduce((totalIds, currentIds) => [...totalIds, ...currentIds]);
  return lodash.uniqBy(duplicatedIds);
};

export const findAllConnectedPrograms: FindAllConnectedPrograms = (
  ids,
  programs,
  findDirectlyConnectedProgramsFunc,
  lodash
) => {
  let connectedIds = findDirectlyConnectedProgramsFunc(ids, programs, lodash);
  let childConnections: number[] = findDirectlyConnectedProgramsFunc(connectedIds, programs, lodash);
  while (childConnections.length !== connectedIds.length) {
    connectedIds = childConnections;
    childConnections = findDirectlyConnectedProgramsFunc(connectedIds, programs, lodash);
  }
  return childConnections;
};

export const findAllConnectedProgramsFactory: FindAllConnectedProgramsFactory = (ids, programs) =>
  findAllConnectedPrograms(ids, programs, findDirectlyConnectedPrograms, _);

export const day12Part1Factory = (input: string) => {
  const programs = splitByRows(input)
    .map(row => parseLine(row));
  return findAllConnectedProgramsFactory([0], programs).length;
};