import {
  Field,
  getField,
  GetField,
  getFieldSize,
  GetFieldSize,
  getNextDesiredDirection,
  GetNextDesiredDirection,
  GetNextNumber,
  getNextPosition,
  GetNextPosition,
  getPossibleDirections,
  GetPossibleDirections,
  Position
} from './part1';

export interface GetNeighbourCellsSum {
  (position: Position, field: Field): number;
}

export interface GetLargerNumber {
  (num: number, field: Field): number;
}

interface GetAnswer {
  (
    input: number,
    functions: {
      getNextPosition: GetNextPosition;
      getNextDesiredDirection: GetNextDesiredDirection;
      getPossibleDirections: GetPossibleDirections;
      getNextNumber: GetNextNumber;
      getFieldSize: GetFieldSize;
      getField: GetField;
      getLargerNumber: GetLargerNumber;
    }
  ): number;
}
export const getNeighbourCellsSum: GetNeighbourCellsSum = (position, field) => {
  let sum = 0;
  for (let row = position.row - 1; row <= position.row + 1; row++) {
    for (let column = position.column - 1; column <= position.column + 1; column++) {
      if (row < 0 || column < 0) {
        continue;
      }
      if (row === position.row && column === position.column) {
        continue;
      }
      const cell = field[row] && field[row][column];
      if (cell !== null) {
        sum += cell;
      }
    }
  }
  return sum;
};

export const getNextNumberFactory: GetNextNumber = (previousNumber, position, field) =>
  getNeighbourCellsSum(position, field);

export const getLargerNumber: GetLargerNumber = (num, field) => {
  let closestNumber: number | undefined;
  for (const row of field) {
    for (const cell of row) {
      if (cell === null || cell <= num) {
        continue;
      }
      if (!closestNumber) {
        closestNumber = cell;
        continue;
      }
      if (cell < closestNumber) {
        closestNumber = cell;
      }
    }
  }
  if (closestNumber === undefined) {
    throw new Error(`there is no larger number than ${num}`);
  }
  return closestNumber;
};

export const getAnswer: GetAnswer = (input, functions) => {
  const fieldSize = functions.getFieldSize(input);
  const startPosition = { row: fieldSize / 2, column: fieldSize / 2 };
  const field = functions.getField(fieldSize, startPosition, 1, input * 10, functions);
  return functions.getLargerNumber(input, field);
};

export const day3Part2Factory = (input: number) => {
  const functions = {
    getNextPosition,
    getNextDesiredDirection,
    getPossibleDirections,
    getNextNumber: getNextNumberFactory,
    getFieldSize,
    getField,
    getLargerNumber
  };
  return getAnswer(input, functions);
};