import { DanceMove, getDanceMoves, performDanceFactory, PerformDanceFactory } from './part1';

interface Cache {
  [key: string]: number | undefined;
}

interface PerformBillionDances {
  (positions: string, moves: DanceMove[], performDance: PerformDanceFactory): string;
}

export const performBillionDances: PerformBillionDances = (positions, moves, performDance) => {
  let cache: Cache = {};
  let iteration = 0;
  let currentPositions = positions;
  let lastCycle = false;
  while (iteration < 10 ** 9) {

    if (lastCycle) {
      // there is no need to save anything to the cache at that point. Just calculate the last dances one by one
      currentPositions = performDance(currentPositions, moves);
      iteration++;
      continue;
    }

    const previousIteration = cache[currentPositions];
    if (previousIteration === undefined) {
      cache[currentPositions] = iteration;
      currentPositions = performDance(currentPositions, moves);
      iteration++;
      continue;
    }

    // the most important part. A skip should be made here to get to 1 billion as close as possible
    // here the iteration starts at 1 billion and checks every time if it is possible to remove some full cycles
    const cycleLength = iteration - previousIteration;
    iteration = 10 ** 9;
    while (iteration % cycleLength !== 0) {
      iteration--;
    }
    currentPositions = performDance(currentPositions, moves);
    iteration++;
    lastCycle = true;
  }
  return currentPositions;
};

export const day16Part2Factory = (input: string, positions = 'abcdefghijklmnop')  => {
  const moves = getDanceMoves(input);
  return performBillionDances(positions, moves, performDanceFactory);
};