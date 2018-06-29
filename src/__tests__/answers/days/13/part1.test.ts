import {
  calculateTotalSeverity,
  getScannerPosition,
  isCaught,
  parseInput,
} from '../../../../answers/days/13/part1';
import { splitByRows } from '../../../../utils';

describe('day 13, part 1', () => {

  describe('parse input function', () => {
    it('should throw if input is incorrect', () => {
      const input = '4: 4\n6: a';
      expect(() => parseInput(input, splitByRows)).toThrow();
    });
    it('should parse input correctly', () => {
      const input = '0: 3\n2: 2';
      expect(parseInput(input, splitByRows)).toEqual([
        { depth: 0, range: 3 },
        { depth: 2, range: 2 }
      ]);
    });
  });

  describe('get scanner position function', () => {
    it('should return 0 for layer with range === 1', () => {
      const layer = {
        depth: 2,
        range: 1
      };
      expect(getScannerPosition(layer, 25)).toBe(0);
    });
    it('should return proper scanner position', () => {
      const layer = {
        depth: 0,
        range: 4
      };
      expect(getScannerPosition(layer, 0)).toBe(0);
      expect(getScannerPosition(layer, 3)).toBe(3);
      expect(getScannerPosition(layer, 4)).toBe(2);
      expect(getScannerPosition(layer, 6)).toBe(0);
      expect(getScannerPosition(layer, 7)).toBe(1);
    });
  });

  describe('calculate total severity function', () => {
    it('should calculate total severity correctly', () => {
      const layers = parseInput('0: 3\n1: 2\n4: 4\n6: 4', splitByRows);
      expect(calculateTotalSeverity(layers, getScannerPosition)).toBe(24);
    });
  });

  describe('is caught function', () => {
    it('should return caught value correctly', () => {
      const defaultLayers = parseInput('0: 3\n1: 2\n4: 4\n6: 4', splitByRows);
      const layers = parseInput('0: 3\n1: 5', splitByRows);
      expect(isCaught(defaultLayers, 0, getScannerPosition)).toBe(true);
      expect(isCaught(layers, 0, getScannerPosition)).toBe(true);
      expect(isCaught(layers, 1, getScannerPosition)).toBe(false);
    });
  });
});