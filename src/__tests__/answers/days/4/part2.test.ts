import { getLettersCount, isSimilar } from '../../../../answers/days/4/part2';
import * as _ from 'lodash';

describe('day 4, part 2', () => {

  describe('is similar function', () => {
    it('should validate correct words', () => {
      expect(isSimilar('ab', 'bas', getLettersCount, _.isEqual)).toBe(false);
      expect(isSimilar('aa', 'aaa', getLettersCount, _.isEqual)).toBe(false);
      expect(isSimilar('bast', 'tasb', getLettersCount, _.isEqual)).toBe(true);
    });
  });

  describe('get letters count function', () => {
    it('should calculate letters count correctly', () => {
      expect(getLettersCount('aaa')).toEqual({a: 3});
      expect(getLettersCount('summary')).toEqual(
        { s: 1, u: 1, m: 2, a: 1, r: 1, y: 1 }
      );
    });
  });

});