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
    field[nextPosition.row][nextPosition.column] = currentNumber + 1;
    currentPosition = nextPosition;
    currentDirection = nextDirection;
    currentNumber++;
  }
  return field;
};

export const getPosition: GetPosition = (number, field) => {
  for (let row = 0; row < field.length; row ++) {
    for (let column = 0; column < field[row].length; column ++) {
      if (field[row][column] === number) {
        return { row, column };
      }
    }
  }
  throw new Error(`number ${number} was not found`);
};

export const getDistance: GetDistance = (first, second) =>
  Math.abs(first.row - second.row) + Math.abs(first.column - second.column);