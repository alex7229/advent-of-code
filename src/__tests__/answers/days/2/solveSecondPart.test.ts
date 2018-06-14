import { findAllPairs, findEvenDivision, solveSecondPart } from '../../../../answers/days/2/solveSecondPart';
import { calculateAnswer } from '../../../../answers/days/2/solveSecondPart';
import { parseInputFactory } from '../../../../answers/days/2/solveFirstPartFactories';
import { checkParsedNumbers } from '../../../../answers/days/2/solveFirstPart';

describe('day 2, part 2', () => {

  describe('find all pairs function', () => {

    it('should return 1 pair if input consists of two numbers', () => {
      expect(findAllPairs([1, 2])).toEqual([[1, 2]]);
    });

    it('should return three pairs if input consists of three numbers', () => {
      const numbers = [1, 2, 3];
      const pairs = findAllPairs(numbers);
      expect(pairs).toEqual([[1, 2], [1, 3], [2, 3]]);
    });

  });

  describe('find even division function', () => {

    it('should throw if no divisible pairs were found', () => {
      const numbers: [number, number][] = [[5, 7]];
      expect(() => findEvenDivision(numbers)).toThrow();
    });

    it('should find correct division despite order', () => {
      const ascending: [number, number][] = [[2, 8]];
      const descending: [number, number][] = [[24, 6]];
      expect(findEvenDivision(ascending)).toBe(4);
      expect(findEvenDivision(descending)).toBe(4);
    });

  });

  describe('calculate answer function', () => {
    it('should throw if inner functions throw', () => {
      const innerFunc = () => {
        throw 'sa';
      };
      expect(() => calculateAnswer([], jest.fn(), innerFunc)).toThrow();
    });
  });

  describe('solve wrapper function', () => {

    const defaultFunctions = {
      parseInput: jest.fn(),
      checkParsedNumbers: jest.fn(),
      findEvenDivision: jest.fn(),
      findAllPairs: jest.fn(),
      calculateAnswer: jest.fn()
    };

    it('should throw if input is incorrect', () => {
      const functions = {
        ...defaultFunctions,
        parseInput: () => {
          throw 'incorrect input';
        }
      };
      expect(() => solveSecondPart('', functions)).toThrow();
    });

    it('should throw if check parsed numbers throws', () => {
      const functions = {
        ...defaultFunctions,
        checkParsedNumbers: () => {
          throw 'bad input';
        }
      };
      expect(() => solveSecondPart('', functions)).toThrow();
    });

    it('real tests', () => {
      const input = '5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5';
      const functions = {
        parseInput: parseInputFactory,
        checkParsedNumbers: checkParsedNumbers,
        findEvenDivision: findEvenDivision,
        findAllPairs: findAllPairs,
        calculateAnswer: calculateAnswer
      };
      expect(solveSecondPart(input, functions)).toBe(9);
    });

  });

});