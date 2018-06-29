import {
  calculateTotalSeverityFactory,
  CalculateTotalSeverityFactory,
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
    calculateTotalSeverity: CalculateTotalSeverityFactory
  ): number;
}

export const findLowestDelay: FindLowestDelay = (
  layers,
  runScannersFunc,
  calculateTotalSeverity
  ) => {
  let delay = 0;
  let currentLayers = layers;
  while (calculateTotalSeverity(currentLayers).isCaught) {
    delay++;
    currentLayers = runScannersFunc(currentLayers);
  }
  return delay;
};

export const day13Part2Factory = (input: string) =>
  findLowestDelay(parseInput(input, splitByRows), runScanners, calculateTotalSeverityFactory);