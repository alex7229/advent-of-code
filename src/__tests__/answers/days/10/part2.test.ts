import {
  addLengths,
  convertToAscii,
  convertToHex,
  getDenseHash,
  hash64Times,
  performXor
} from '../../../../answers/days/10/part2';
import { HashResult } from '../../../../answers/days/10/part1';

describe('day 10, part 2', () => {

  describe('convert to ascii function', () => {
    it('should convert to ascii codes correctly', () => {
      expect(convertToAscii('1,2,3')).toEqual([49, 44, 50, 44, 51]);
    });
  });

  describe('add lengths function', () => {
    it('should add correct lengths to parsed  lengths', () => {
      const lengths = [1, 2];
      expect(addLengths(lengths)).toEqual([1, 2, 17, 31, 73, 47, 23]);
    });
  });

  describe('hash 64 times function', () => {
    it('should call hash 64 times with correct params', () => {
      const list = [1, 5];
      const hashResult: HashResult = {
        list: [7, 2],
        position: 1,
        skip: 23
      };
      const lengths = [2, 5, 7];
      const hashFactory = jest.fn().mockReturnValue(hashResult);
      hash64Times(list, hashFactory, lengths);
      expect(hashFactory.mock.calls.length).toBe(64);
      const firstCallParams = hashFactory.mock.calls[0];
      const secondCallParams = hashFactory.mock.calls[1];
      expect(firstCallParams).toEqual([list, lengths, 0, 0]);
      expect(secondCallParams).toEqual([hashResult.list, lengths, hashResult.skip, hashResult.position]);
    });
  });

  describe('perform xor function', () => {
    it('should calculate xor result correctly', () => {
      const list = [65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22];
      expect(performXor(list)).toEqual(64);
    });
  });

  describe('get dense hash function', () => {
    it('should produce correct hash', () => {
      const list = [1, 2, 3, 4];
      const xor = jest.fn()
        .mockReturnValueOnce(5)
        .mockReturnValueOnce(6);
      expect(getDenseHash(list, 2, xor)).toEqual([5, 6]);
      expect(xor.mock.calls.length).toBe(2);
      expect(xor.mock.calls[0][0]).toEqual([list[0], list[1]]);
      expect(xor.mock.calls[1][0]).toEqual([list[2], list[3]]);
    });
  });

  describe('convert to hex function', () => {
    it('should convert to hex correctly', () => {
      expect(convertToHex([64, 7, 255])).toBe('4007ff');
    });
  });

});