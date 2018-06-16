import { countValidPhrases, findWords, isPhraseValid } from '../../../../answers/days/4/part1';

describe('day 4, part 1', () => {

  describe('find words function', () => {
    it('should divide string correctly', () => {
      expect(findWords('as sda')).toEqual(['as', 'sda']);
      expect(findWords('as')).toEqual(['as']);
    });
  });

  describe('is phrase valid function', () => {
    it('tests from advent of code', () => {
      expect(isPhraseValid(findWords('aa bb cc dd ee'))).toBe(true);
      expect(isPhraseValid(findWords('aa bb cc dd aa'))).toBe(false);
      expect(isPhraseValid(findWords('aa bb cc dd aaa'))).toBe(true);
    });
  });

  describe('count valid phrases function', () => {
    it('should count valid phrases correctly', () => {
      const splitByRows = jest.fn().mockReturnValue(['as', 'ba', 'ma']);
      const isPhraseValidMock = jest.fn()
        .mockReturnValueOnce(false)
        .mockReturnValue(true);
      expect(countValidPhrases('', splitByRows, isPhraseValidMock, findWords)).toBe(2);
      expect(isPhraseValidMock.mock.calls.length).toBe(3);
      expect(isPhraseValidMock.mock.calls[2][0]).toEqual(['ma']);
    });
  });

});