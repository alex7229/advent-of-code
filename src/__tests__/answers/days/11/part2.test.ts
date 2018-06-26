import { getMaxStepsCount } from '../../../../answers/days/11/part2';
import { Direction } from '../../../../answers/days/11/part1';

describe('day 11, part 2', () => {
  describe('get maximum steps count function', () => {
    it('should calculate max steps correctly', () => {
      const directions: Direction[] = ['ne', 'sw', 'n'];
      const simplifyDirectionsMock = jest.fn()
        .mockReturnValueOnce(Array(2))
        .mockReturnValueOnce(Array(6))
        .mockReturnValueOnce(Array(17));
      expect(getMaxStepsCount(directions, simplifyDirectionsMock)).toBe(17);
      expect(simplifyDirectionsMock.mock.calls.length).toBe(3);
    });
  });
});