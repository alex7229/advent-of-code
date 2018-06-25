import { getMaxStepsCount } from '../../../../answers/days/11/part2';
import { Direction } from '../../../../answers/days/11/part1';

describe('day 11, part 2', () => {
  describe('get maximum steps count function', () => {
    it('should calculate max steps correctly', () => {
      const directions: Direction[] = ['ne', 'sw', 'n'];
      const getStepsCountMock = jest.fn()
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(6)
        .mockReturnValueOnce(17);
      expect(getMaxStepsCount(directions, getStepsCountMock)).toBe(17);
      expect(getStepsCountMock.mock.calls.length).toBe(3);
      expect(getStepsCountMock.mock.calls[0][0]).toEqual([directions[0]]);
      expect(getStepsCountMock.mock.calls[1][0]).toEqual([directions[0], directions[1]]);
      expect(getStepsCountMock.mock.calls[2][0]).toEqual(directions);
    });
  });
});