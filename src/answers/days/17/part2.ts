interface FindNumberAfterZero {
  (maxNumber: number, stepLength: number): number;
}

export const findNumberAfterZero: FindNumberAfterZero = (maxNumber, stepLength) => {
  let buffer = { length: 1, position: 0 };
  let numberAfterZero = 0;
  let iteration = 0;
  while (buffer.length <= maxNumber) {
    iteration++;
    let nextPosition = buffer.position + stepLength + 1;
    if (nextPosition >= buffer.length) {
      nextPosition = nextPosition % buffer.length;
    }
    if (nextPosition === 0) {
      nextPosition = buffer.length;
    }
    if (nextPosition === 1) {
      numberAfterZero = iteration;
    }
    buffer.position = nextPosition;
    buffer.length ++;
  }
  return numberAfterZero;
};

export const day17Part2Factory = (input: string, maxNumber = 5 * 10 ** 7) =>
  findNumberAfterZero(maxNumber, parseInt(input, 10));