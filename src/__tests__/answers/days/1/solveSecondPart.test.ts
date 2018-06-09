import { calculateCaptcha, findComparingPairs, solveSecondPart } from '../../../../answers/days/1/solveSecondPart';
import { checkInput } from '../../../../answers/days/1/solveFirstPart';

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

  describe('solve second part wrapper', () => {

    it('should check input', () => {
      const checkInput = jest.fn().mockReturnValue(false);
      expect(() => solveSecondPart('1234', checkInput, jest.fn())).toThrow();
      expect(checkInput.mock.calls.length).toBe(1);
      expect(checkInput.mock.calls[0][0]).toBe('1234');
    });

    it('real tests', () => {
      const solve = (input: string) => solveSecondPart(input, checkInput, calculateCaptcha);
      expect(solve('1212')).toBe(6);
      expect(solve('1221')).toBe(0);
      expect(solve('123425')).toBe(4);
      expect(solve('123123')).toBe(12);
      expect(solve('12131415')).toBe(4);
    });

  });

});