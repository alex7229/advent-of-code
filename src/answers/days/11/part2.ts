import { Direction, getStepsCountFactory, GetStepsCountFactory, parseInput } from './part1';

interface GetMaxStepsCount {
  (directions: Direction[], getStepsCount: GetStepsCountFactory): number;
}

export const getMaxStepsCount: GetMaxStepsCount = (directions, getStepsCount) => {
  let steps: number[] = [];
  for (let i = 0; i < directions.length; i++) {
    // this can take a while. Around 20 secs on i5 for real input
    const partialDirections = directions.slice(0, i + 1);
    steps.push(getStepsCount(partialDirections));
  }
  return Math.max(...steps);
};

export const day11Part2Factory = (input: string) => getMaxStepsCount(parseInput(input), getStepsCountFactory);