import {
  Direction,
  parseInput,
  simplifyDirectionsFactory,
  SimplifyDirectionsFactory
} from './part1';

interface GetMaxStepsCount {
  (directions: Direction[], simplifyDirections: SimplifyDirectionsFactory): number;
}

export const getMaxStepsCount: GetMaxStepsCount = (directions, simplifyDirections) => {
  let steps: number[] = [];
  let currentDirections: Direction[] = [];
  for (let i = 0; i < directions.length; i++) {
    currentDirections.push(directions[i]);
    // possible performance improvement. There is no need to call simplifyDirections function every time
    // if max steps count was 1400 and current is 1301, next would be at max 1302
    currentDirections = simplifyDirections(currentDirections);
    steps.push(currentDirections.length);
  }
  return Math.max(...steps);
};

export const day11Part2Factory = (input: string) =>
  getMaxStepsCount(parseInput(input), simplifyDirectionsFactory);