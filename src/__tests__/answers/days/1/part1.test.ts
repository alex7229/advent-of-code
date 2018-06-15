import { calculateCaptcha, checkInput, day1Part1 } from '../../../../answers/days/1/part1';
import { findArraySum } from '../../../../utils';

describe('day 1, first part', () => {

  describe('check input function', () => {

    it('should return true if it is string with number', () => {
      expect(checkInput('234234')).toBe(true);
      expect(checkInput('23d')).toBe(false);
    });

  });

  describe('calculate captcha function -> actual solution without circular input change', () => {
    expect(calculateCaptcha('1122', findArraySum)).toBe(3);
    expect(calculateCaptcha('1111', findArraySum)).toBe(3);
    expect(calculateCaptcha('121', findArraySum)).toBe(0);
  });

  describe('day1Part1 first part wrapper', () => {

    it('should throw if input in incorrect', () => {
      const checkInputMock = jest.fn().mockReturnValue(false);
      expect(() => day1Part1('', jest.fn(), checkInputMock, jest.fn())).toThrow();
    });

    it('should call calculate captcha with correct input', () => {
      const calculateCaptchaMock = jest.fn().mockReturnValue(17);
      const checkInputMock = jest.fn().mockReturnValue(true);
      const findArraySumMock = jest.fn();
      const answer = day1Part1('233', calculateCaptchaMock, checkInputMock, findArraySumMock);
      expect(calculateCaptchaMock.mock.calls.length).toBe(1);
      expect(calculateCaptchaMock.mock.calls[0][0]).toBe('2332');
      expect(calculateCaptchaMock.mock.calls[0][1]).toBe(findArraySumMock);
      expect(answer).toBe(17);
    });

  });

});
