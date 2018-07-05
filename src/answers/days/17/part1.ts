export interface Buffer {
  values: number[];
  position: number;
}

interface Insert {
  (buffer: Buffer, stepLength: number): Buffer;
}

interface FindNextDirectNumber {
  (searchNumber: number, stepLength: number, insert: Insert): number;
}

export const insert: Insert = (buffer, stepLength) => {
  const bufferValues = [...buffer.values];
  let nextPosition = buffer.position + stepLength + 1;
  if (nextPosition >= bufferValues.length) {
    nextPosition = nextPosition % bufferValues.length;
  }
  const maxNumber = Math.max(...bufferValues);
  bufferValues.splice(nextPosition, 0, maxNumber + 1);
  return { values: bufferValues, position: nextPosition };
};

export const findNextDirectNumber: FindNextDirectNumber = (searchNumber, stepLength, insertFunc) => {
  let buffer: Buffer = { values: [0], position: 0 };
  while (buffer.values.length <= searchNumber) {
    buffer = insertFunc(buffer, stepLength);
  }
  const numIndex = buffer.values.findIndex(currentNumber => currentNumber === searchNumber);
  return buffer.values[numIndex + 1];
};

export const day17Part1Factory = (input: string) =>
  findNextDirectNumber(2017, parseInt(input, 10), insert);