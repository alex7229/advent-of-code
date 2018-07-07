import { findNumberAfterZero } from '../../../../answers/days/17/part2';

describe('day 17, part 2', () => {
  it('should find the number correctly', () => {
    expect(findNumberAfterZero(2017, 3)).toBe(1226);
  });
});