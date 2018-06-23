import {
  getDefaultRegisters,
  getHighestRegisterValue,
  parseInput,
  parseInstruction, runInstructionFactory
} from '../../../../answers/days/8/part1';
import { splitByRows } from '../../../../utils';
import { getHighestRegisterInProcess } from '../../../../answers/days/8/part2';

describe('day 8, part 2', () => {
  describe('get highest register in process function', () => {
    it('tests from advent of code', () => {
      const input = 'b inc 5 if a > 1\n' +
        'a inc 1 if b < 5\n' +
        'c dec -10 if a >= 1\n' +
        'c inc -20 if c == 10';
      const instructions = parseInput(input, splitByRows, parseInstruction);
      const registers = getDefaultRegisters(instructions);
      const value =
        getHighestRegisterInProcess(instructions, registers, getHighestRegisterValue, runInstructionFactory);
      expect(value).toBe(10);
    });
  });
});