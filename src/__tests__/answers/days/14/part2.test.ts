import {
  findGroups
} from '../../../../answers/days/14/part2';
import * as _ from 'lodash';

describe('day 14, part 2', () => {

  describe('find groups function', () => {
    it('should find groups correctly', () => {
      const oneSimpleGroup = [
        '00',
        '01'
      ];
      const oneSimpleGroupFewElements = [
        '11'
      ];
      const oneComplexGroup = [
        '01',
        '11'
      ];
      expect(findGroups(oneSimpleGroup)).toEqual([['1-1']]);
      expect(findGroups(oneSimpleGroupFewElements)).toEqual([['0-0', '0-1']]);
      expect(findGroups(oneComplexGroup)).toEqual([['1-0', '0-1', '1-1']]);
      const threeGroups = [
        '101',
        '011',
        '101'
      ];
      expect(findGroups(threeGroups)).toEqual([['0-0'], ['2-0'], ['1-1', '0-2', '1-2', '2-2']]);
      const grid = [
        '11010100',
        '01010101',
        '00001010',
        '10101101',
        '01101000',
        '11001001',
        '01000100',
        '11010110'
      ];
      // that's the grid from the advent of code page
      // instead of full grid group number eight is divided in 4 groups here
      expect(findGroups(grid).length).toBe(12);
    });
    it('should not change grid parameter after finding groups', () => {
      const grid = ['11', '00'];
      const gridCopy = _.cloneDeep(grid);
      findGroups(grid);
      expect(grid).toEqual(gridCopy);
    });
    it('should not create duplicate entries in groups', () => {
      const group = [
        '111',
        '111',
      ];
      expect(findGroups(group)).toEqual([['0-0', '1-0', '0-1', '1-1', '0-2', '1-2']]);
    });
  });
});