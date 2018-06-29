import {
  calculateTotalSeverity,
  getScannerPosition, getScannerPositionFactory, isCaught,
  Layer,
  parseInput,
  runScanners
} from '../../../../answers/days/13/part1';
import { splitByRows } from '../../../../utils';
import * as _ from 'lodash';

describe('day 13, part 1', () => {

  describe('parse input function', () => {
    it('should throw if input is incorrect', () => {
      const input = '4: 4\n6: a';
      expect(() => parseInput(input, splitByRows)).toThrow();
    });
    it('should parse input correctly', () => {
      const input = '0: 3\n2: 2';
      expect(parseInput(input, splitByRows)).toEqual([
        { depth: 0, range: 3, scannerPosition: 0, scannerDirection: 'down' },
        { depth: 2, range: 2, scannerPosition: 0, scannerDirection: 'down' }
      ]);
    });
  });

  describe('run scanners function', () => {
    it('should run scanners properly', () => {
      const layers: Layer[] = [
        { depth: 0, range: 1, scannerPosition: 0, scannerDirection: 'down' },
        { depth: 1, range: 2, scannerPosition: 0, scannerDirection: 'down' },
        { depth: 2, range: 3, scannerPosition: 0, scannerDirection: 'down' }
      ];
      const layersCopy = _.cloneDeep(layers);
      const firstTurn = runScanners(layers);
      const secondTurn = runScanners(firstTurn);
      const thirdTurn = runScanners(secondTurn);
      const fourthTurn = runScanners(thirdTurn);
      const fifthTurn = runScanners(fourthTurn);
      expect(layers).toEqual(layersCopy);
      // range 1 layer doesn't change at all
      expect(firstTurn[0]).toEqual(layers[0]);
      expect(firstTurn[1]).toEqual({ depth: 1, range: 2, scannerPosition: 1, scannerDirection: 'down' });
      expect(firstTurn[2]).toEqual({ depth: 2, range: 3, scannerPosition: 1, scannerDirection: 'down' });
      // range 2  layer is back to the start position on the second turn
      expect(secondTurn[1]).toEqual(layers[1]);
      expect(secondTurn[2]).toEqual({ depth: 2, range: 3, scannerPosition: 2, scannerDirection: 'up' });
      expect(thirdTurn[2]).toEqual({ depth: 2, range: 3, scannerPosition: 1, scannerDirection: 'up' });
      expect(fourthTurn[2]).toEqual({ depth: 2, range: 3, scannerPosition: 0, scannerDirection: 'up' });
      expect(fifthTurn[2]).toEqual({ depth: 2, range: 3, scannerPosition: 1, scannerDirection: 'down' });
    });
  });

  describe('get scanner position function', () => {
    it('should return proper scanner position', () => {
      const layer: Layer = {
        depth: 0,
        range: 3,
        scannerPosition: 0,
        scannerDirection: 'down'
      };
      const runScannersMock = jest.fn()
        .mockReturnValueOnce([{ ...layer, scannerPosition: 17 }])
        .mockReturnValueOnce([{ ...layer, scannerPosition: 25 }]);
      expect(getScannerPosition(layer, 0, runScannersMock)).toBe(0);
      expect(runScannersMock.mock.calls.length).toBe(0);
      expect(getScannerPosition(layer, 2, runScannersMock)).toBe(25);
      expect(runScannersMock.mock.calls.length).toBe(2);
    });
  });

  describe('calculate total severity function', () => {
    it('should calculate total severity correctly', () => {
      const layers = parseInput('0: 3\n1: 2\n4: 4\n6: 4', splitByRows);
      expect(calculateTotalSeverity(layers, getScannerPositionFactory)).toBe(24);
    });
  });

  describe('is caught function', () => {
    it('should return caught value correctly', () => {
      const defaultLayers = parseInput('0: 3\n1: 2\n4: 4\n6: 4', splitByRows);
      const layers = parseInput('0: 3\n1: 5', splitByRows);
      expect(isCaught(defaultLayers, getScannerPositionFactory)).toBe(true);
      expect(isCaught(layers, getScannerPositionFactory)).toBe(true);
      expect(isCaught(runScanners(layers), getScannerPositionFactory)).toBe(false);
    });
  });
});