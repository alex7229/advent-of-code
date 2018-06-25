import { getLengths, getList, getNextPosition, hash, reverse } from '../../../../answers/days/10/part1';

describe('day 10, part 1', () => {

  const hashExamples: number[][] = [
    [0, 1, 2, 3, 4],
    [2, 1, 0, 3, 4],
    [4, 3, 0, 1, 2],
    [3, 4, 2, 1, 0]
  ];

  describe('reverse function', () => {
    it('should reverse correctly', () => {
      expect(reverse(hashExamples[0], 3, 0)).toEqual(hashExamples[1]);
      expect(reverse(hashExamples[1], 4, 3)).toEqual(hashExamples[2]);
      expect(reverse(hashExamples[2], 1, 0)).toEqual(hashExamples[2]);
      expect(reverse(hashExamples[2], 5, 1)).toEqual(hashExamples[3]);
    });
  });

  describe('get next position function', () => {
    it('should calculate next position correctly', () => {
      const list = Array(5).fill(0);
      expect(getNextPosition(0, 2, 2, list)).toBe(4);
      expect(getNextPosition(3, 2, 2, list)).toBe(2);
    });
  });

  describe('get lengths function', () => {
    it('should throw if input is incorrect', () => {
      expect(() => getLengths('2,as')).toThrow();
      expect(() => getLengths('')).toThrow();
      expect(() => getLengths('as')).toThrow();
    });
    it('should find numbers correctly', () => {
      expect(getLengths('254,229,24')).toEqual([254, 229, 24]);
      expect(getLengths('2')).toEqual([2]);
    });
  });

  describe('get list function', () => {
    it('should produce correct list', () => {
      expect(getList(1)).toEqual([0]);
      expect(getList(3)).toEqual([0, 1, 2]);
    });
  });

  describe('hash function', () => {
    it('should produce correct list with given lengths', () => {
      const lengths = [3, 4, 1, 5];
      expect(hash(hashExamples[0], reverse, [lengths[0]], getNextPosition)).toEqual(hashExamples[1]);
      expect(hash(hashExamples[0], reverse, [lengths[0], lengths[1]], getNextPosition)).toEqual(hashExamples[2]);
      const length3 = [lengths[0], lengths[1], lengths[2]];
      expect(hash(hashExamples[0], reverse, length3, getNextPosition)).toEqual(hashExamples[2]);
      expect(hash(hashExamples[0], reverse, lengths, getNextPosition)).toEqual(hashExamples[3]);
    });
  });
});