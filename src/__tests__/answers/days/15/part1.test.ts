import {
  compareNumbers,
  Generators,
  getMatchesNumber,
  getNextNumber,
  parseInput
} from '../../../../answers/days/15/part1';

describe('day 15, part 1', () => {

  describe('get next number function', () => {
    it('should provide correct number', () => {
      const firstGenerator = {
        startNumber: 65,
        multiplier: 16807
      };
      const secondNumber = getNextNumber(firstGenerator.startNumber, firstGenerator.multiplier);
      const thirdNumber = getNextNumber(secondNumber, firstGenerator.multiplier);
      expect(secondNumber).toBe(1092455);
      expect(thirdNumber).toBe(1181022009);
    });
  });

  describe('parse input function', () => {
    it('should produce correct output', () => {
      const input =
        'Generator A starts with 289\n' +
        'Generator B starts with 62';
      expect(parseInput(input)).toEqual({
        A: { startNumber: 289 },
        B: { startNumber: 62 }
      });
    });
    it('should throw if input is incorrect', () => {
      const input =
        'Generator A starts with 289\n' +
        'Generator B starts with ';
      expect(() => parseInput(input)).toThrow();
    });
  });

  describe('compare numbers function', () => {
    it('should compare correctly small numbers', () => {
      expect(compareNumbers(23, 23)).toBe(true);
    });
    it('should compare numbers by bits', () => {
      expect(compareNumbers(245556042, 2455560423)).toBe(false);
      expect(compareNumbers(245556042, 1431495498)).toBe(true);
    });
  });

  describe('get matches number function', () => {
    it('should calculate matches number correctly', () => {
      const generators: Generators = {
        A: { startNumber: 65 },
        B: { startNumber: 8921 }
      };
      expect(getMatchesNumber(generators, 5, compareNumbers, getNextNumber)).toBe(1);
    });
  });

});