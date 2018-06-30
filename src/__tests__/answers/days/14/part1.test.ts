import { calculateSquares, calculateSquaresInRow, getGrid, hexToBin } from '../../../../answers/days/14/part1';

describe('day 14, part 1', () => {
  describe('convert hex to bin function', () => {
    it('should convert short values', () => {
      expect(hexToBin('0')).toBe('0000');
      expect(hexToBin('1')).toBe('0001');
      expect(hexToBin('e')).toBe('1110');
      expect(hexToBin('f')).toBe('1111');
      expect(hexToBin('a0c2017')).toBe('1010000011000010000000010111');
    });
    it('should convert long values', () => {
      // e binary is 1110
      let eString = '';
      let expectedBinary = '';
      for (let i = 0; i < 32; i++) {
        eString += 'e';
        expectedBinary += '1110';
      }
      expect(hexToBin(eString)).toBe(expectedBinary);
    });
  });
  describe('get grid function', () => {
    it('should use knot hash and hex to bin properly', () => {
      const knotHash = jest.fn()
        .mockReturnValue('hash');
      const hexToBinMock = jest.fn()
        .mockReturnValue('binary');
      expect(getGrid('bas', knotHash, hexToBinMock).length).toBe(128);
      expect(knotHash.mock.calls.length).toBe(128);
      expect(knotHash.mock.calls[127][0]).toBe('bas-127');
      expect(hexToBinMock.mock.calls.length).toBe(128);
      expect(hexToBinMock.mock.calls[127][0]).toBe('hash');
    });
  });
  describe('calculate squares function', () => {
    it('should calculate squares properly', () => {
      const grid = ['0001101', '011110'];
      // it's the amount of number 1
      expect(calculateSquares(grid, calculateSquaresInRow)).toBe(7);
    });
  });
  describe('calculate squares in one row', () => {
    it('should calculate properly', () => {
      expect(calculateSquaresInRow('fsdf')).toBe(0);
      expect(calculateSquaresInRow('011001')).toBe(3);
    });
  });
});