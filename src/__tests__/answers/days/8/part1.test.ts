import {
  Action, checkCondition, Condition,
  getDefaultRegisters, getHighestRegisterValue,
  Instruction,
  parseInput,
  parseInstruction,
  runAction, runInstruction
} from '../../../../answers/days/8/part1';
import { splitByRows } from '../../../../utils';

describe('day 8, part 1', () => {

  describe('parse input function', () => {
    it('should call parse instruction correctly', () => {
      const input = 'as\nba';
      const instructions = ['first instr', 'second instr'];
      const parseInstructionMock = jest.fn()
        .mockReturnValueOnce(instructions[0])
        .mockReturnValueOnce(instructions[1]);
      expect(parseInput(input, splitByRows, parseInstructionMock)).toEqual(instructions);
      expect(parseInstructionMock.mock.calls.length).toBe(2);
      expect(parseInstructionMock.mock.calls[0][0]).toBe('as');
      expect(parseInstructionMock.mock.calls[1][0]).toBe('ba');
    });
  });

  describe('parse instruction function', () => {
    it('should throw if instruction string is incorrect', () => {
      expect(() => parseInstruction('giq 28 if iox > -81')).toThrow();
    });
    it('should parse instructions correctly', () => {
      const instruction =  'c dec -10 if a >= 1';
      const parsedInstruction: Instruction = {
        action: {
          register: 'c',
          type: 'dec',
          value: -10
        },
        condition: {
          register: 'a',
          type: '>=',
          value: 1
        }
      };
      expect(parseInstruction(instruction)).toEqual(parsedInstruction);
    });
  });

  describe('get default registers function', () => {
    it('should find correct registers without dups', () => {
      const input = 'a inc 1 if b < 5\n' +
        'c dec -10 if a >= 1\n' +
        'c inc -20 if c == 10';
      const instructions = parseInput(input, splitByRows, parseInstruction);
      expect(getDefaultRegisters(instructions)).toEqual({ a: 0, b: 0, c: 0 });
    });
  });
  describe('run instructions function', () => {
    it('should not run action if condition is invalid', () => {
      const registers = {a: 0, b: 0};
      const instruction: Instruction = {
        action: { type: 'dec', register: 'a', value: 2 },
        condition: { type: '', value: 2, register: 'b' }
      };
      const runActionMock = jest.fn();
      const checkConditionMock = jest.fn()
        .mockReturnValue(false);
      runInstruction(instruction, registers, runActionMock, checkConditionMock);
      expect(runActionMock.mock.calls.length).toBe(0);
    });
    it('should run instruction correctly if condition is valid', () => {
      const registers = { a: 0, b: 3 };
      const instruction: Instruction = {
        action: { type: 'dec', register: 'a', value: 2 },
        condition: { type: '==', value: 3, register: 'b' }
      };
      runInstruction(instruction, registers, runAction, checkCondition);
      expect(registers).toEqual({ a: -2, b: 3 });
    });
  });
  describe('run action function', () => {
    it(`should throw if registers block doesn't have appropriate register`, () => {
      let registers = { b: 23 };
      const action: Action = {
        type: 'dec',
        register: 'a',
        value: 2
      };
      expect(() => runAction(action, registers)).toThrow();
    });
    it('should decrement', () => {
      let registers = { a: 0 };
      const action: Action = {
        type: 'dec',
        register: 'a',
        value: -2
      };
      runAction(action, registers);
      // 2 because of double negation
      expect(registers).toEqual({ a: 2 });
    });
    it('should increment', () => {
      let registers = { a: 3 };
      const action: Action = {
        type: 'inc',
        register: 'a',
        value: 4
      };
      runAction(action, registers);
      expect(registers).toEqual({ a: 7 });
    });
  });

  describe('check condition function', () => {
    const registers = { b: 23 };
    it('should throw if condition type was not recognized', () => {
      const condition: Condition = {
        register: 'b',
        type: 'sd',
        value: 2
      };
      expect(() => checkCondition(condition, registers)).toThrow();
    });
    it('should throw if register is undefined', () => {
      const condition: Condition = {
        register: 's',
        type: '>',
        value: 2
      };
      expect(() => checkCondition(condition, registers)).toThrow();
    });
    it('should validate >', () => {
      const invalid: Condition = { register: 'b', type: '>', value: 23 };
      const valid: Condition = { register: 'b', type: '>', value: 22 };
      expect(checkCondition(invalid, registers)).toBe(false);
      expect(checkCondition(valid, registers)).toBe(true);
    });
    it('should validate <', () => {
      const invalid: Condition = { register: 'b', type: '<', value: 23 };
      const valid: Condition = { register: 'b', type: '<', value: 24 };
      expect(checkCondition(invalid, registers)).toBe(false);
      expect(checkCondition(valid, registers)).toBe(true);
    });
    it('should validate >=', () => {
      const valid: Condition = { register: 'b', type: '>=', value: 23 };
      const invalid: Condition = { register: 'b', type: '>=', value: 24 };
      expect(checkCondition(invalid, registers)).toBe(false);
      expect(checkCondition(valid, registers)).toBe(true);
    });
    it('should validate <=', () => {
      const valid: Condition = { register: 'b', type: '<=', value: 23 };
      const invalid: Condition = { register: 'b', type: '<=', value: 22 };
      expect(checkCondition(invalid, registers)).toBe(false);
      expect(checkCondition(valid, registers)).toBe(true);
    });
    it('should validate ==', () => {
      const valid: Condition = { register: 'b', type: '==', value: 23 };
      const invalid: Condition = { register: 'b', type: '==', value: 24 };
      expect(checkCondition(invalid, registers)).toBe(false);
      expect(checkCondition(valid, registers)).toBe(true);
    });
    it('should validate !=', () => {
      const invalid: Condition = { register: 'b', type: '!=', value: 23 };
      const valid: Condition = { register: 'b', type: '!=', value: 24 };
      expect(checkCondition(invalid, registers)).toBe(false);
      expect(checkCondition(valid, registers)).toBe(true);
    });
  });

  describe('get highest register value', () => {
    it('should throw if there are no registers', () => {
      expect(() => getHighestRegisterValue({})).toThrow();
    });
    it('should find max value correctly', () => {
      const registers = { a: 2, cs: 23, b: 23 };
      expect(getHighestRegisterValue(registers)).toBe(23);
      expect(getHighestRegisterValue({ a: 22 })).toBe(22);
    });
  });
});