import { getNextNumber } from '../../../../answers/days/15/part2';

describe('day 15, part 2', () => {
  describe('get next number function', () => {
    it('should produce correct next numbers', () => {
      const startNumber = 65;
      const multiplier = 16807;
      const divisor = 4;
      const secondNumber = getNextNumber(startNumber, multiplier, divisor);
      const thirdNumber = getNextNumber(secondNumber, multiplier, divisor);
      expect(secondNumber).toBe(1352636452);
      expect(thirdNumber).toBe(1992081072);
    });
    it('should throw if divisor is undefined', () => {
      expect(() => getNextNumber(2, 2)).toThrow();
    });
  });
});