import { findAllConnectedProgramsFactory, FindAllConnectedProgramsFactory, parseLine, Program } from './part1';
import { splitByRows } from '../../../utils';

interface FindAllGroups {
  (programs: Program[], findAllConnectedPrograms: FindAllConnectedProgramsFactory): number[][];
}

export const findAllGroups: FindAllGroups = (programs, findAllConnectedPrograms) => {
  let groups: number[][] = [];
  for (const program of programs) {
    const alreadyIncluded = groups.some(group => group.includes(program.id));
    if (alreadyIncluded) {
      continue;
    }
    groups.push(findAllConnectedPrograms([program.id], programs));
  }
  return groups;
};

export const day12Part2Factory = (input: string) => {
  const programs = splitByRows(input)
    .map(row => parseLine(row));
  return findAllGroups(programs, findAllConnectedProgramsFactory).length;
};