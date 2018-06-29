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

interface GetMaxDepth {
  (layers: Layer[]): number;
}

interface Severity {
  isCaught: boolean;
  value: number;
}

interface CalculateTotalSeverity {
  (
    layers: Layer[],
    getMaxDepth: GetMaxDepth,
    runScanners: RunScanners
  ): Severity;
}

export interface CalculateTotalSeverityFactory {
  (layers: Layer[]): Severity;
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

export const getMaxDepth: GetMaxDepth = layers => {
  const depths = layers.map((layer) => layer.depth);
  return Math.max(...depths);
};

export const calculateTotalSeverity: CalculateTotalSeverity = (layers, getMaxDepthFunc, runScannersFunc) => {
  const maxDepth = getMaxDepthFunc(layers);
  let nextLayers: Layer[] = layers;
  let totalSeverity = 0;
  let isCaught = false;
  for (let sec = 0; sec <= maxDepth; sec ++) {
    const currentLayers = nextLayers;
    nextLayers = runScannersFunc(currentLayers);
    const currentLayer = currentLayers.find(layer => layer.depth === sec);
    if (currentLayer === undefined) {
      continue;
    }
    const isCaughtNow = currentLayer.scannerPosition === 0;
    if (isCaughtNow) {
      isCaught = true;
      totalSeverity += currentLayer.depth * currentLayer.range;
    }
  }
  return { isCaught, value: totalSeverity };
};

export const calculateTotalSeverityFactory: CalculateTotalSeverityFactory = layers =>
  calculateTotalSeverity(layers, getMaxDepth, runScanners);

export const day13Part1Factory = (input: string) => {
  const layers = parseInput(input, splitByRows);
  return calculateTotalSeverityFactory(layers).value;
};