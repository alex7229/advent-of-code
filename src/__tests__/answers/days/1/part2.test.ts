import {
  calculateCaptcha,
  findComparingPairs,
  day1Part2
} from '../../../../answers/days/1/part2';

describe('day 1, second part', () => {

  describe('find comparing pairs func', () => {
    it('should return correct pairs', () => {
      // numbers doesn't matter here at all
      // input string length should be even, that's all. But it's not checked
      const pairs = findComparingPairs('1234');
      expect(pairs.length).toBe('1234'.length);
      expect(pairs).toEqual([
        { firstPosition: 0, secondPosition: 2 },
        { firstPosition: 1, secondPosition: 3 },
        { firstPosition: 2, secondPosition: 0 },
        { firstPosition: 3, secondPosition: 1 }
      ]);
    });
  });

  describe('calculate captcha func', () => {
    it('should calculate sum of numbers correctly', () => {
      expect(calculateCaptcha('11')).toEqual(2);
    });
  });

  describe('day1Part1 second part wrapper', () => {

    it('should check input', () => {
      const checkInput = jest.fn().mockReturnValue(false);
      expect(() => day1Part2('1234', checkInput, jest.fn())).toThrow();
      expect(checkInput.mock.calls.length).toBe(1);
      expect(checkInput.mock.calls[0][0]).toBe('1234');
    });

  });

});