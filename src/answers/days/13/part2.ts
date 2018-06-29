import {
  isCaughtFactory,
  IsCaughtFactory,
  Layer,
  parseInput
} from './part1';
import { splitByRows } from '../../../utils';

interface FindLowestDelay {
  (
    layers: Layer[],
    isCaught: IsCaughtFactory
  ): number;
}

export const findLowestDelay: FindLowestDelay = (layers, isCaught) => {
  let delay = 0;
  while (isCaught(layers, delay)) {
    delay++;
  }
  return delay;
};

export const day13Part2Factory = (input: string) =>
  findLowestDelay(parseInput(input, splitByRows), isCaughtFactory);