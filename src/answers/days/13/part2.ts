import {
  isCaughtFactory,
  IsCaughtFactory,
  Layer,
  parseInput,
  runScanners,
  RunScanners
} from './part1';
import { splitByRows } from '../../../utils';

interface FindLowestDelay {
  (
    layers: Layer[],
    runScanners: RunScanners,
    isCaught: IsCaughtFactory
  ): number;
}

export const findLowestDelay: FindLowestDelay = (
  layers,
  runScannersFunc,
  isCaught
  ) => {
  let delay = 0;
  let currentLayers = layers;
  while (isCaught(currentLayers)) {
    delay++;
    currentLayers = runScannersFunc(currentLayers);
  }
  return delay;
};

export const day13Part2Factory = (input: string) =>
  findLowestDelay(parseInput(input, splitByRows), runScanners, isCaughtFactory);