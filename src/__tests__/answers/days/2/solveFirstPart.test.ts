import {
  calculateAnswer,
  checkParsedNumbers,
  parseInput,
  parseRow,
  solveFirstPart
} from '../../../../answers/days/2/solveFirstPart';
import { splitByRows } from '../../../../utils';

describe('day 2, part 1', () => {

  describe('parse row function', () => {
    it('should get numbers from row with tabs', () => {
      const row = `2593	139	2136`;
      expect(parseRow(row)).toEqual([2593, 139, 2136]);
    });
  });

  describe('parse input function', () => {
    it('should parse input correctly', () => {
      const splitByRowsMock = jest.fn().mockReturnValue(['first row', 'second row']);
      const numbers = [
        [2, 16],
        [4, 6, 2]
      ];
      const parseRowMock = jest.fn()
        .mockReturnValueOnce(numbers[0])
        .mockReturnValueOnce(numbers[1]);
      expect(parseInput('', splitByRowsMock, parseRowMock)).toEqual(numbers);
    });
  });

  describe('check parsed numbers', () => {
    it('should validate numbers correctly', () => {
      const correctNumbers = [[2, 5], [5, 2]];
      const incorrectNumbers = [[23, NaN]];
      expect(checkParsedNumbers(correctNumbers)).toBe(true);
      expect(checkParsedNumbers(incorrectNumbers)).toBe(false);
    });
  });

  describe('calculate answer function', () => {
    it('should return correct answer', () => {
      expect(calculateAnswer([[2, 6], [1, 6, 7]])).toBe(10);
    });
  });

  describe('solve wrapper', () => {

    it('should call check input correctly and throw if input is parsed incorrectly', () => {
      const input = `2\t5\tgsa`;
      const functions = {
        parseInput: jest.fn().mockReturnValue([[2, NaN]]),
        checkParsedNumbers: jest.fn().mockReturnValue(false),
        calculateAnswer: jest.fn(),
        splitByRows: jest.fn(),
        parseRow: jest.fn()
      };
      expect(() => solveFirstPart(input, functions)).toThrow();
      expect(functions.parseInput.mock.calls.length).toBe(1);
      const parseInputArguments = functions.parseInput.mock.calls[0];
      expect(parseInputArguments[0]).toBe(input);
      expect(parseInputArguments[1]).toBe(functions.splitByRows);
      expect(parseInputArguments[2]).toBe(functions.parseRow);
    });

    it('real tests', () => {
      const input =
        '5\t1\t9\t5\n' +
        '7\t5\t3\n' +
        '2\t4\t6\t8';
      const functions = {
        parseInput,
        parseRow,
        checkParsedNumbers,
        calculateAnswer,
        splitByRows
      };
      expect(solveFirstPart(input, functions)).toBe(18);
    });

  });

});