import { splitByRows, SplitByRows } from '../../../utils';

export interface Action {
  type: 'inc' | 'dec';
  register: string;
  value: number;
}

export interface Condition {
  type: string;
  register: string;
  value: number;
}

export interface Instruction {
  action: Action;
  condition: Condition;
}

interface Registers {
  [key: string]: number;
}

interface ParseInstruction {
  (input: string): Instruction;
}

interface ParseInput {
  (input: string, splitByRows: SplitByRows, parseInstruction: ParseInstruction): Instruction[];
}

interface GetDefaultRegisters {
  (instructions: Instruction[]): Registers;
}

interface RunAction {
  (action: Action, registers: Registers): void;
}

interface CheckCondition {
  (condition: Condition, registers: Registers): boolean;
}

interface RunInstruction {
  (
    instruction: Instruction,
    registers: Registers,
    runAction: RunAction,
    checkCondition: CheckCondition
  ): void;
}

interface GetHighestRegisterValue {
  (registers: Registers): number;
}

export const parseInstruction: ParseInstruction = (input) => {
  const regExp = /(\w+) (dec|inc) (-?\d+) if (\w+) ([^\s]+) (-?\d+)/;
  const match = input.match(regExp);
  if (match === null) {
    throw new Error(`instruction "${input}" was not recognised`);
  }
  const [, actionReg, actionType, actionValue, conditionReg, conditionType, conditionValue] = match;
  return {
    action: {
      type: actionType === 'inc' ? 'inc' : 'dec',
      register: actionReg,
      value: parseInt(actionValue, 10)
    },
    condition: {
      type: conditionType,
      register: conditionReg,
      value: parseInt(conditionValue, 10)
    }
  };
};

export const getDefaultRegisters: GetDefaultRegisters = (instructions => {
  const registers: Registers = {};
  for (const instruction of instructions) {
    registers[instruction.action.register] = 0;
    registers[instruction.condition.register] = 0;
  }
  return registers;
});

export const runInstruction: RunInstruction = (instruction, registers, runActionFunc, checkConditionFunc) => {
  if (checkConditionFunc(instruction.condition, registers) === false) {
    return;
  }
  runActionFunc(instruction.action, registers);
};

export const runAction: RunAction = (action, registers) => {
  if (registers[action.register] === undefined) {
    throw new Error(`impossible to run action. Register ${action.register} is not present`);
  }
  if (action.type === 'inc') {
    registers[action.register] += action.value;
    return;
  }
  registers[action.register] -= action.value;
};

export const checkCondition: CheckCondition = (condition, registers) => {
  if (registers[condition.register] === undefined) {
    throw new Error(`impossible to check condition. Register ${condition.register} is not present`);
  }
  if (condition.type === '>') {
    return registers[condition.register] > condition.value;
  }
  if (condition.type === '<') {
    return registers[condition.register] < condition.value;
  }
  if (condition.type === '>=') {
    return registers[condition.register] >= condition.value;
  }
  if (condition.type === '<=') {
    return registers[condition.register] <= condition.value;
  }
  if (condition.type === '==') {
    return registers[condition.register] === condition.value;
  }
  if (condition.type === '!=') {
    return registers[condition.register] !== condition.value;
  }
  throw new Error(`condition "${condition.type}" was not recognized`);
};

export const getHighestRegisterValue: GetHighestRegisterValue = registers => {
  const values = Object.values(registers);
  if (values.length === 0) {
    throw new Error('there are no registers');
  }
  return Math.max(...values);
};

export const parseInput: ParseInput = (input, splitByRowsFunc, parseInstructionFunc) =>
  splitByRowsFunc(input)
  .map(row => parseInstructionFunc(row));

export const day8Part1Factory = (input: string) => {
  const instructions = parseInput(input, splitByRows, parseInstruction);
  const registers = getDefaultRegisters(instructions);
  instructions.forEach(instruction => runInstruction(instruction, registers, runAction, checkCondition));
  return getHighestRegisterValue(registers);
};