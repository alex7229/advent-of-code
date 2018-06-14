import { parseInput, parseRow } from './solveFirstPart';
import { splitByRows } from '../../../utils';

export const parseInputFactory = (input: string): number[][] =>
  parseInput(input, splitByRows, parseRow);