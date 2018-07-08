import { splitByRows } from '../../../../utils';
import { findStepsCount } from '../../../../answers/days/19/part2';
import { findLetters, findStartPosition, getNextCellPosition } from '../../../../answers/days/19/part1';

describe('day 19, part 2', () => {
  describe('find steps count function', () => {
    it('should return correct number', () => {
      const input =
        '     |          \n' +
        '     |  +--+    \n' +
        '     A  |  C    \n' +
        ' F---|--|-E---+ \n' +
        '     |  |  |  D \n' +
        '     +B-+  +--+ \n';
      const cells = splitByRows(input)
        .map(line => line.split(''));
      expect(findStepsCount(cells, findLetters, findStartPosition, getNextCellPosition)).toBe(38);
    });
  });
});