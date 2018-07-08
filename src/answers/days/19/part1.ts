import { Position } from '../3/part1';
import { splitByRows } from '../../../utils';

interface FindStartPosition {
  (lines: string[]): Position;
}

interface FindLetters {
  (lines: string[][], startPosition: Position, getNextCellPosition: GetNextCellPosition): string;
}

interface GetNextCellPosition {
  (lines: string[][], currentPosition: Position, previousPosition: Position): Position | null;
}

export const findStartPosition: FindStartPosition = lines => {
  if (lines.length === 0) {
    throw new Error(`lines number must be higher than 0`);
  }
  const column = lines[0]
    .split('')
    .findIndex(char => char === '|');
  if (column === -1) {
    throw new Error(`this input doesn't have a starting point`);
  }
  return { row: 0, column };
};

export const findLetters: FindLetters = (lines, startPosition, getNextCellPositionFunc) => {
  let letters = '';
  let previousPoint = { ...startPosition };
  // second position should be under the first
  let currentPoint: Position | null = { row: startPosition.row + 1, column: startPosition.column };
  while (currentPoint !== null) {
    const currentCharacter = lines[currentPoint.row][currentPoint.column];
    if (currentCharacter.toUpperCase() !== currentCharacter.toLowerCase()) {
      // it's a letter then
      letters += currentCharacter;
    }

    const nextPoint = getNextCellPositionFunc(lines, currentPoint, previousPoint);
    previousPoint = currentPoint;
    currentPoint = nextPoint;
  }
  return letters;
};

export const getNextCellPosition: GetNextCellPosition = (lines, currentPosition, previousPosition) => {
  const currentSymbol = lines[currentPosition.row][currentPosition.column];
  const topPosition = {
    row: currentPosition.row - 1,
    column: currentPosition.column
  };
  const bottomPosition = {
    row: currentPosition.row + 1,
    column: currentPosition.column
  };
  const leftPosition = {
    row: currentPosition.row,
    column: currentPosition.column - 1
  };
  const rightPosition = {
    row: currentPosition.row,
    column: currentPosition.column + 1
  };
  let previousCellDirection = 'right';
  if (currentPosition.row > previousPosition.row) {
    previousCellDirection = 'up';
  } else if (currentPosition.row < previousPosition.row) {
    previousCellDirection = 'down';
  } else if (currentPosition.column > previousPosition.column) {
    previousCellDirection = 'left';
  }
  let nextPosition: Position | undefined;
  if (currentSymbol !== '+') {
    // same direction as before (opposite to the direction of the previous cell)
    if (previousCellDirection === 'up') {
      nextPosition = bottomPosition;
    } else if (previousCellDirection === 'down') {
      nextPosition = topPosition;
    } else if (previousCellDirection === 'left') {
      nextPosition = rightPosition;
    } else {
      nextPosition = leftPosition;
    }
  } else {
    // direction would change because of + symbol
    if (previousCellDirection === 'up' || previousCellDirection === 'down') {
      // next would be left or right
      const leftCell = lines[leftPosition.row] && lines[leftPosition.row][leftPosition.column];
      if (leftCell === undefined || leftCell === ' ') {
        nextPosition = rightPosition;
      } else {
        nextPosition = leftPosition;
      }
    } else  {
      // next would be top or down
      const topCell = lines[topPosition.row] && lines[topPosition.row][topPosition.column];
      if (topCell === undefined || topCell === ' ') {
        nextPosition = bottomPosition;
      } else {
        nextPosition = topPosition;
      }
    }
  }
  if (nextPosition === undefined) {
    throw new Error('position should be found at that point');
  }
  const nextSymbol = lines[nextPosition.row] && lines[nextPosition.row][nextPosition.column];
  if (nextSymbol && nextSymbol !== ' ') {
    return nextPosition;
  }
  return null;
};

export const day19Part1Factory = (input: string) => {
  const lines = splitByRows(input);
  const cells = lines.map(line => line.split(''));
  const startPosition = findStartPosition(lines);
  return findLetters(cells, startPosition, getNextCellPosition);
};