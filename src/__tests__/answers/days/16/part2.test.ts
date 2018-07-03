import { performBillionDances } from '../../../../answers/days/16/part2';
import { getDanceMoves, performDanceFactory } from '../../../../answers/days/16/part1';

describe('day 16, part 2', () => {
  describe('perform billion dances function', () => {
    it('should predict return value after 1 billion iterations', () => {
      const positions = 'abc';
      let iteration = 0;
      const performDance = () => {
        iteration++;
        if (iteration % 3 === 0) {
          return 'abc';
        }
        if (iteration % 3 === 1) {
          return 'bac';
        }
        return 'cab';
      };
      expect(performBillionDances(positions, [], performDance)).toEqual('bac');
      // instead of running 1 billion iteration the function must predict the value after one billion iterations
      expect(iteration).toBeLessThan(20);
    });
    it('should perform dance on correct data from advent of code', () => {
      const positions = 'abcde';
      const moves = getDanceMoves('s1,x3/4,pe/b');
      expect(performBillionDances(positions, moves, performDanceFactory)).toEqual('baedc');
    });
  });
});