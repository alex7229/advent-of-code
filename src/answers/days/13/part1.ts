import { splitByRows, SplitByRows } from '../../../utils';

export interface Layer {
  depth: number;
  range: number;
  scannerPosition: number;
  scannerDirection: 'up' | 'down';
}

interface ParseInput {
  (input: string, splitByRows: SplitByRows): Layer[];
}

export interface RunScanners {
  (layers: Layer[]): Layer[];
}

export interface GetScannerPosition {
  (layer: Layer, delay: number, runScanners: RunScanners): number;
}

export interface GetScannerPositionFactory {
  (layer: Layer, delay: number): number;
}

interface IsCaught {
  (layers: Layer[], getScannerPosition: GetScannerPositionFactory): boolean;
}

export interface IsCaughtFactory {
  (layers: Layer[]): boolean;
}

interface CalculateTotalSeverity {
  (
    layers: Layer[],
    getScannerPosition: GetScannerPositionFactory
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
        depth:  parseInt(depthString, 10),
        scannerPosition: 0,
        scannerDirection: 'down'
      };
      if (Number.isNaN(layer.depth) || Number.isNaN(layer.range)) {
        throw new Error('input in incorrect');
      }
      return layer;
    });

export const runScanners: RunScanners = layers =>
  layers.map(layer => {
    // the direction doesn't matter for small layers (1 or 2 range)
    if (layer.range === 1) {
      return { ...layer };
    }
    if (layer.range === 2) {
      return { ...layer, scannerPosition: layer.scannerPosition === 0 ? 1 : 0 };
    }
    let nextPosition = layer.scannerDirection === 'down' ? layer.scannerPosition + 1 : layer.scannerPosition - 1;
    let nextDirection = layer.scannerDirection;
    if (nextPosition < 0) {
      // it was out of bounds and moved in wrong direction. Change direction and place scanner at 1-st pos
      nextPosition = 1;
      nextDirection = 'down';
    }
    if (nextPosition + 1 === layer.range) {
      // it would be out of bounds the next turn so direction is changed now
      nextDirection = 'up';
    }
    return { ...layer, scannerPosition: nextPosition, scannerDirection: nextDirection };
  });

export const getScannerPosition: GetScannerPosition = (layer, delay, runScannersFunc) => {
  let currentLayer: Layer = layer;
  for (let sec = 0; sec < delay; sec++) {
    currentLayer = runScannersFunc([currentLayer])[0];
  }
  return currentLayer.scannerPosition;
};

export const calculateTotalSeverity: CalculateTotalSeverity = (layers, getScannerPositionFunc) =>
  layers
    .filter(layer => getScannerPositionFunc(layer, layer.depth) === 0)
    .reduce((totalSeverity, currentLayer) => totalSeverity += (currentLayer.depth * currentLayer.range), 0);

export const isCaught: IsCaught = (layers, getScannerPositionFunc) =>
  !!layers.find(layer => getScannerPositionFunc(layer, layer.depth) === 0);

export const getScannerPositionFactory: GetScannerPositionFactory = (layer, delay) =>
  getScannerPosition(layer, delay, runScanners);

export const isCaughtFactory: IsCaughtFactory = layers =>
  isCaught(layers, getScannerPositionFactory);

export const calculateTotalSeverityFactory: CalculateTotalSeverityFactory = layers =>
  calculateTotalSeverity(layers, getScannerPositionFactory);

export const day13Part1Factory = (input: string) => {
  const layers = parseInput(input, splitByRows);
  return calculateTotalSeverityFactory(layers);
};