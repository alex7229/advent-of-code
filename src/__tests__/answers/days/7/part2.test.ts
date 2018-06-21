import { findRootTower, Information } from '../../../../answers/days/7/part1';
import { findWeight, getBalancedWeight } from '../../../../answers/days/7/part2';
import * as _ from 'lodash';
import unmock = jest.unmock;

describe('day 7, part 2', () => {
  describe('find weight function', () => {

    it('should throw if no info was found', () => {
      const info: Information = {};
      const nestedInfo: Information = {
        outer: { weight: 42, holds: ['inner']}
      };
      expect(() => findWeight('sa', info)).toThrow();
      expect(() => findWeight('outer', nestedInfo)).toThrow();
    });

    it('should calculate the weight correctly', () => {
      const simple: Information = {
        na: { weight: 22, holds: []}
      };
      const nested: Information = {
        na: { weight: 10, holds: ['ba']},
        ba: { weight: 22, holds: ['ka'] },
        ka: { weight: 13, holds: [] }
      };
      expect(findWeight('na', simple)).toEqual({ total: 22, itself: 22, holds: 0 });
      expect(findWeight('na', nested)).toEqual({ total: 45, itself: 10, holds: 35 });
    });

  });

  describe('get balanced weight function', () => {
    const info: Information = {
      root: { weight: 10, holds: ['one', 'two', 'three'] },
      one: { weight: 20, holds: [] },
      two: { weight: 35, holds: [] },
      three: { weight: 20, holds: [] }
    };
    it('tower is balanced, contains root only', () => {
      const rootOnly: Information = {
        root: { weight: 10, holds: [] }
      };
      expect(getBalancedWeight(rootOnly, findRootTower, findWeight)).toBe(0);
    });
    it('root contains one tower and that tower is balanced', () => {
      const balanced: Information = {
        root: { weight: 2, holds: ['inner'] },
        inner: { weight: 6, holds: [] }
      };
      expect(getBalancedWeight(balanced, findRootTower, findWeight)).toBe(0);
    });
    it('root contains two balanced towers', () => {
      const balanced: Information = {
        root: { weight: 2, holds: ['first', 'second'] },
        first: { weight: 5, holds: [] },
        second: { weight: 6, holds: [] }
      };
      expect(getBalancedWeight(balanced, findRootTower, findWeight)).toBe(0);
    });
    it('root contains three or more towers and they are all balanced', () => {
      const balanced: Information = {
        root: { weight: 2, holds: ['first', 'second', 'third', 'fifth'] },
        first: { weight: 7, holds: [] },
        second: { weight: 7, holds: [] },
        third: { weight: 7, holds: [] },
        fifth: { weight: 7, holds: [] }
      };
      expect(getBalancedWeight(balanced, findRootTower, findWeight)).toBe(0);
    });
    it('unbalanced tower is far away from the root', () => {
      const unbalanced: Information = {
        root: { weight: 10, holds: ['one', 'two', 'three' ]},
        one: { weight: 15, holds: [] },
        two: { weight: 15, holds: [] },
        three: { weight: 6, holds: ['four', 'five', 'six'] },
        four: { weight: 3, holds: [] },
        five: { weight: 2, holds: [] },
        six: { weight: 3, holds: [] }
      };
      // three should weigh 15 total, four, five, six -> 3 total each. Five is unbalanced -> it should weigh 3
      expect(getBalancedWeight(unbalanced, findRootTower, findWeight)).toBe(3);
    });
    it('element two is unbalanced by itself', () => {
      expect(getBalancedWeight(info, findRootTower, findWeight)).toBe(20);
    });
    it('element two is unbalanced because of weight of children', () => {
      let infoCopy: Information = _.cloneDeep(info);
      infoCopy.two = { weight: 20, holds: ['four', 'five']};
      infoCopy.four = { weight: 1, holds: [] };
      infoCopy.five = { weight: 1, holds:  [] };
      expect(getBalancedWeight(infoCopy, findRootTower, findWeight)).toBe(18);
    });
  });
});