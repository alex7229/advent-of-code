import {
  getDefaultRegisters, getHighestRegisterValue,
  GetHighestRegisterValue,
  Instruction,
  parseInput,
  parseInstruction,
  Registers, runInstructionFactory,
  RunInstructionFactory
} from './part1';
import { splitByRows } from '../../../utils';

interface GetHighestRegisterInProcess {
  (
    instructions: Instruction[],
    registers: Registers,
    getHighestRegisterValue: GetHighestRegisterValue,
    runInstruction: RunInstructionFactory
  ): number;
}

export const getHighestRegisterInProcess: GetHighestRegisterInProcess = (
  instructions,
  registers,
  getHighestRegisterValueFunc,
  runInstruction
) => {
  let maxValue = 0;
  for (const instruction of instructions) {
    runInstruction(instruction, registers);
    maxValue = Math.max(maxValue, getHighestRegisterValueFunc(registers));
  }
  return maxValue;
};

export const day8Part2Factory = (input: string) => {
  const instructions = parseInput(input, splitByRows, parseInstruction);
  const registers = getDefaultRegisters(instructions);
  return getHighestRegisterInProcess(instructions, registers, getHighestRegisterValue, runInstructionFactory);
};