import { splitByRows, SplitByRows } from '../../../utils';

export interface Layer {
  depth: number;
  range: number;
}

interface ParseInput {
  (input: string, splitByRows: SplitByRows): Layer[];
}

export interface RunScanners {
  (layers: Layer[]): Layer[];
}

export interface GetScannerPosition {
  (layer: Layer, delay: number): number;
}

interface IsCaught {
  (layers: Layer[], delay: number, getScannerPosition: GetScannerPosition): boolean;
}

export interface IsCaughtFactory {
  (layers: Layer[], delay: number): boolean;
}

interface CalculateTotalSeverity {
  (
    layers: Layer[],
    getScannerPosition: GetScannerPosition
  ): number;
}

export interface CalculateTotalSeverityFactory {
  (layers: Layer[]): number;
}

export const parseInput: ParseInput = (input, splitByRowsFunc) =>
  splitByRowsFunc(input)
    .map((row) => {
      const [depthString, rangeString] = row.split(': ');
      const layer: Layer = {
        range: parseInt(rangeString, 10),
        depth:  parseInt(depthString, 10)
      };
      if (Number.isNaN(layer.depth) || Number.isNaN(layer.range)) {
        throw new Error('input in incorrect');
      }
      return layer;
    });

export const getScannerPosition: GetScannerPosition = (layer, delay) => {
  if (layer.range === 1) {
    return 0;
  }
  if (delay < layer.range) {
    return delay;
  }
  const cycleLength = layer.range - 1;
  const currentCyclePosition = delay % cycleLength;
  const fullCycles = Math.floor(delay / cycleLength);
  const isOdd = fullCycles % 2 === 1;
  // if full cycles number is odd -> scanner is moving up
  if (isOdd) {
    return cycleLength - currentCyclePosition;
  }
  return currentCyclePosition;
};

export const calculateTotalSeverity: CalculateTotalSeverity = (layers, getScannerPositionFunc) =>
  layers
    .filter(layer => getScannerPositionFunc(layer, layer.depth) === 0)
    .reduce((totalSeverity, currentLayer) => totalSeverity += (currentLayer.depth * currentLayer.range), 0);

export const isCaught: IsCaught = (layers, delay, getScannerPositionFunc) =>
  !!layers.find(layer => getScannerPositionFunc(layer, delay + layer.depth) === 0);

export const isCaughtFactory: IsCaughtFactory = (layers, delay) =>
  isCaught(layers, delay, getScannerPosition);

export const calculateTotalSeverityFactory: CalculateTotalSeverityFactory = layers =>
  calculateTotalSeverity(layers, getScannerPosition);

export const day13Part1Factory = (input: string) => {
  const layers = parseInput(input, splitByRows);
  return calculateTotalSeverityFactory(layers);
};