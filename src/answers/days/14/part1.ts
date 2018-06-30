import { day10Part2Factory as knotHash } from '../10/part2';

interface HexToBin {
  (hex: string): string;
}

interface KnotHash {
  (input: string): string;
}

interface GetGrid {
  (input: string, knotHash: KnotHash,  hexToBin: HexToBin): string[];
}

interface CalculateSquaresInRow {
  (binaryRow: string): number;
}

interface CalculateSquares {
  (grid: string[], calculateSquaresInRow: CalculateSquaresInRow): number;
}

export const hexToBin: HexToBin = hex =>
  hex
    .split('')
    .map(hexChar => parseInt(hexChar, 16).toString(2))
    .map(binary =>  binary.padStart(4, '0'))
    .join('');

export const getGrid: GetGrid = (input, knotHashFunc, hexToBinFunc) => {
  let inputs: string[] = [];
  for (let i = 0; i < 128; i++) {
    inputs.push(input + '-' + i);
  }
  return inputs
    .map(currentInput => knotHashFunc(currentInput))
    .map(hex => hexToBinFunc(hex));
};

export const calculateSquaresInRow: CalculateSquaresInRow = binaryRow =>
  binaryRow
    .split('')
    .filter(char => char === '1')
    .length;

export const calculateSquares: CalculateSquares = (grid, calculateSquaresInRowFunc) =>
  grid
    .map(row => calculateSquaresInRowFunc(row))
    .reduce((total, current) => total += current);

export const day14Part1Factory = (input: string) => {
  const grid = getGrid(input, knotHash, hexToBin);
  return calculateSquares(grid, calculateSquaresInRow);
};