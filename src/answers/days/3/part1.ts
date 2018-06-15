export type Field = Array<Array<number | null>>;

interface Position {
  row: number;
  column: number;
}

interface GetField {
  (
    size: number,
    startPosition: Position,
    startNumber: number,
    fillTo: number,
    functions: {
      getNextPosition: GetNextPosition;
      getNextDesiredDirection: GetNextDesiredDirection;
      getPossibleDirections: GetPossibleDirections;
      getNextNumber: GetNextNumber;
    }
  ): Field;
}

export interface PossibleDirections {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

interface GetNextDesiredDirection {
  (previousDirection: string, possibleDirections: PossibleDirections): string;
}

interface GetPossibleDirections {
  (position: Position, field: Field): PossibleDirections;
}

interface GetNextPosition {
  (direction: string, previousPosition: Position): Position;
}

interface GetPosition {
  (num: number, field: Field): Position;
}

interface GetDistance {
  (first: Position, second: Position): number;
}

interface GetNextNumber {
  (previousNumber: number, position: Position, field: Field): number;
}

interface GetFieldSize {
  (input: number): number;
}

interface GetAnswer {
  (
    input: number,
    functions: {
      getNextPosition: GetNextPosition;
      getPosition: GetPosition;
      getNextDesiredDirection: GetNextDesiredDirection;
      getPossibleDirections: GetPossibleDirections;
      getNextNumber: GetNextNumber;
      getFieldSize: GetFieldSize;
      getField: GetField;
      getDistance: GetDistance;
    }
  ): number;
}

export const getNextDesiredDirection: GetNextDesiredDirection = (previousDirection, possibleDirections) => {
  if (previousDirection === 'down' && possibleDirections.right) {
    return 'right';
  }
  if (previousDirection === 'right' && possibleDirections.up) {
    return 'up';
  }
  if (previousDirection === 'up' && possibleDirections.left) {
    return 'left';
  }
  if (previousDirection === 'left' && possibleDirections.down) {
    return 'down';
  }
  return previousDirection;
};

export const getNextPosition: GetNextPosition = (direction, prevPosition) => {
  let position: Position = prevPosition;
  if (direction === 'up') {
    position.row --;
  }
  if (direction === 'down') {
    position.row ++;
  }
  if (direction === 'left') {
    position.column --;
  }
  if (direction === 'right') {
    position.column ++;
  }
  return position;
};

export const getPossibleDirections: GetPossibleDirections = (position, field) => ({
  up: field[position.row - 1][position.column] === null,
  down: field[position.row + 1][position.column] === null,
  left: field[position.row][position.column - 1] === null,
  right: field[position.row][position.column + 1] === null
});

export const getField: GetField = (size, startPosition, startNumber, fillTo, functions) => {
  const getRow = () => Array(size).fill(null);
  let field = Array(size)
    .fill(0)
    .map(() => getRow());
  field[startPosition.row][startPosition.column] = startNumber;
  let currentNumber = startNumber;
  let currentPosition = { ...startPosition };
  let currentDirection = 'down';
  while (currentNumber < fillTo) {
    const directions  = functions.getPossibleDirections(currentPosition, field);
    const nextDirection = functions.getNextDesiredDirection(currentDirection, directions);
    const nextPosition = functions.getNextPosition(nextDirection, currentPosition);
    const nextNumber = functions.getNextNumber(currentNumber, currentPosition, field);
    field[nextPosition.row][nextPosition.column] = nextNumber;
    currentPosition = nextPosition;
    currentDirection = nextDirection;
    currentNumber = nextNumber;
  }
  return field;
};

export const getPosition: GetPosition = (num, field) => {
  for (let row = 0; row < field.length; row ++) {
    for (let column = 0; column < field[row].length; column ++) {
      if (field[row][column] === num) {
        return { row, column };
      }
    }
  }
  throw new Error(`number ${num} was not found`);
};

export const getDistance: GetDistance = (first, second) =>
  Math.abs(first.row - second.row) + Math.abs(first.column - second.column);

export const getNextNumber: GetNextNumber = (num, position, field) => num + 1;

export const getFieldSize: GetFieldSize = (input) => {
  const pureSize = Math.sqrt(input);
  const margin = 10;
  // 10 is a safe margin (it helps numbers to not get outside of the field boundaries)
  const size = Math.round(pureSize) + margin;
  if (size % 2 !== 0) {
    return size + 1;
  }
  return size;
};

export const getAnswer: GetAnswer = (input, functions) => {
  const fieldSize = functions.getFieldSize(input);
  const startPosition = { row: fieldSize / 2, column: fieldSize / 2 };
  const field = functions.getField(fieldSize, startPosition, 1, input, functions);
  const numberPosition = functions.getPosition(input, field);
  return functions.getDistance(startPosition, numberPosition);
};

export const day3Part1Factory = (input: number) => {
  const functions = {
    getNextPosition,
    getNextDesiredDirection,
    getPossibleDirections,
    getNextNumber,
    getPosition,
    getFieldSize,
    getField,
    getDistance
  };
  return getAnswer(input, functions);
};