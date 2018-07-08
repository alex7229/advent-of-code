import { findLetters, findStartPosition, getNextCellPosition } from '../../../../answers/days/19/part1';
import { splitByRows } from '../../../../utils';
import { Position } from '../../../../answers/days/3/part1';

describe('day19, part 1', () => {
  describe('find start position function', () => {
    it('should find the start position correctly', () => {
      const input =
        '     |          \n' +
        '     |  +--+    \n';
      expect(findStartPosition(splitByRows(input))).toEqual({ row: 0, column: 5 });
    });
    it(`should throw if lines number is 0 or top line doesn't have '|' char`, () => {
      expect(() => findStartPosition([])).toThrow();
      expect(() => findStartPosition(['dsf'])).toThrow();
    });
  });

  describe('get next cell position function', () => {
    it('simple down or up route', () => {
      const lines =
        '     |          \n' +
        '     |  +--+    \n' +
        '     A ';
      const cells = splitByRows(lines)
        .map(line => line.split(''));
      const topPosition: Position = { row: 0, column: 5 };
      const middlePosition: Position = { row: 1, column: 5 };
      const bottomPosition: Position = { row: 2, column: 5 };
      expect(getNextCellPosition(cells, middlePosition, topPosition)).toEqual(bottomPosition);
      expect(getNextCellPosition(cells, middlePosition, bottomPosition)).toEqual(topPosition);
    });
    it('simple right of left route', () => {
      const input =
        '     |          \n' +
        '     |  +--+    \n' +
        '     A ';
      const cells = splitByRows(input)
        .map(line => line.split(''));
      const leftPosition: Position = { row: 1, column: 8 };
      const middlePosition: Position = { row: 1, column: 9 };
      const rightPosition: Position = { row: 1, column: 10 };
      expect(getNextCellPosition(cells, middlePosition, leftPosition)).toEqual(rightPosition);
      expect(getNextCellPosition(cells, middlePosition, rightPosition)).toEqual(leftPosition);
    });
    it('should return null if there is nowhere to go next', () => {
      const cells = [['-', '-']];
      const leftPosition: Position = { row: 0, column: 0 };
      const rightPosition: Position = { row: 0, column: 1 };
      expect(getNextCellPosition(cells, leftPosition, rightPosition)).toBe(null);
      expect(getNextCellPosition(cells, rightPosition, leftPosition)).toBe(null);
      const anotherInput = [
        ['|'],
        ['+']
      ];
      const topPosition: Position = { row: 0, column: 0 };
      const bottomPosition: Position = { row: 1, column: 0 };
      expect(getNextCellPosition(anotherInput, topPosition, bottomPosition)).toBe(null);
      expect(getNextCellPosition(anotherInput, bottomPosition, topPosition)).toBe(null);
    });
    it('should return null if next symbol is a white space', () => {
      const input = [
        '--|',
        '--|',
        '-- '
      ];
      const cells = input.map(line => line.split(''));
      const previousPosition: Position = { row: 0, column: 2 };
      const currentPosition: Position = { row: 1, column: 2 };
      expect(getNextCellPosition(cells, currentPosition, previousPosition)).toBe(null);
    });
    it('should turn right', () => {
      const input = [
        '|   ',
        '+-  '
      ];
      const cells = input
        .map(line => line.split(''));
      const previousPosition: Position = { row: 0, column: 0 };
      const currentPosition: Position = { row: 1, column: 0 };
      expect(getNextCellPosition(cells, currentPosition, previousPosition)).toEqual({ row: 1, column: 1 });
    });
    it('should turn left', () => {
      const input = [
        ' |',
        '-+'
      ];
      const cells = input.map(line => line.split(''));
      const previousPosition: Position = { row: 0, column: 1 };
      const currentPosition: Position = { row: 1, column: 1 };
      expect(getNextCellPosition(cells, currentPosition, previousPosition)).toEqual({ row: 1, column: 0 });
    });
    it('should turn up', () => {
      const input = [
        '  |',
        '--+',
        '   '
      ];
      const cells = input.map(line => line.split(''));
      const previousPosition: Position = { row: 1, column: 1 };
      const currentPosition: Position = { row: 1, column: 2 };
      expect(getNextCellPosition(cells, currentPosition, previousPosition)).toEqual({ row: 0, column: 2 });
    });
    it('should turn down', () => {
      const input = [
        '--+',
        '--|'
      ];
      const cells = input.map(line => line.split(''));
      const previousPosition: Position = { row: 0, column: 1 };
      const currentPosition: Position = { row: 0, column: 2 };
      expect(getNextCellPosition(cells, currentPosition, previousPosition)).toEqual({ row: 1, column: 2 });
    });
  });

  describe('find letters function', () => {

    it('should find correct letters', () => {
      const input = [
        ' A',
        'BC',
        '-| ',
        '-D+|'
      ];
      const cells = input.map(line => line.split(''));
      const startPosition = { row: 0, column: 0 };
      const route: Position[] = [
        { row: 2, column: 2 },
        { row: 3, column: 1 },
        { row: 3, column: 2 }
      ];
      const getNextCellPositionMock = jest.fn()
        .mockReturnValueOnce(route[0])
        .mockReturnValueOnce(route[1])
        .mockReturnValueOnce(route[2])
        .mockReturnValueOnce(null);
      expect(findLetters(cells, startPosition, getNextCellPositionMock)).toBe('BD');
      expect(getNextCellPositionMock.mock.calls.length).toBe(4);
      expect(getNextCellPositionMock.mock.calls[0]).toEqual([cells, { row: 1, column: 0 }, startPosition]);
      expect(getNextCellPositionMock.mock.calls[1]).toEqual([cells, route[0], { row: 1, column: 0 }]);
      expect(getNextCellPositionMock.mock.calls[2]).toEqual([cells, route[1], route[0]]);
      expect(getNextCellPositionMock.mock.calls[3]).toEqual([cells, route[2], route[1]]);
    });

    it('should return empty string if no letters were found', () => {
      const input = [
        '-|',
        '-_'
      ];
      const cells = input.map(line => line.split(''));
      const getNextCellPositionMock = jest.fn()
        .mockReturnValue(null);
      expect(findLetters(cells, { row: 0, column: 0 }, getNextCellPositionMock)).toBe('');
    });

  });
});