import {
  findLetters,
  FindLetters,
  findStartPosition,
  FindStartPosition,
  getNextCellPosition,
  GetNextCellPosition
} from './part1';
import { splitByRows } from '../../../utils';

interface FindStepsCount {
  (
    cells: string[][],
    findLetters: FindLetters,
    findStartPosition: FindStartPosition,
    getNextCellPosition: GetNextCellPosition
  ): number;
}

export const findStepsCount: FindStepsCount = (
  cells,
  findLettersFunc,
  findStartPositionFunc,
  getNextCellPositionFunc
) => {
  let iteration = 0;
  const getNextCellPositionExtended: GetNextCellPosition = (lines, currentPosition, previousPosition) => {
    iteration++;
    return getNextCellPositionFunc(lines, currentPosition, previousPosition);
  };
  const startPosition = findStartPositionFunc(cells);
  findLettersFunc(cells, startPosition, getNextCellPositionExtended);
  // get next cell position is not invoked for the first two points
  // besides that get next position is called one more time after the last point was found
  // so +2 - 1 === 1
  return iteration + 1;
};

export const day19Part2Factory = (input: string) => {
  const cells = splitByRows(input)
    .map(line => line.split(''));
  return findStepsCount(cells, findLetters, findStartPosition, getNextCellPosition);
};