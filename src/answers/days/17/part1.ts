import { splitByRows, SplitByRows } from '../../../utils';

export interface Registers {
  [key: string]: number;
}

export interface Instruction {
  type: string;
  values: [string | number, number | string | null];
}

interface GenerateRegisters {
  (): Registers;
}

interface ParseInstructions {
  (input: string, splitByRows: SplitByRows): Instruction[];
}

export const generateRegisters: GenerateRegisters = () => {
  let registers = {};
  // 97 -> a, 122 -> z
  for (let i = 97; i <= 122; i++) {
    registers[String.fromCharCode(i)] = 0;
  }
  return registers;
};

export const parseInstructions: ParseInstructions = (input, splitByRowsFunc) => {
  const rows = splitByRowsFunc(input);
  return rows.map(row => {
    let [type, firstValue, secondValue] = row.split(' ');
    const firstValueNumber = parseInt(firstValue, 10);
    const secondValueNumber = parseInt(secondValue, 10);
    const instruction: Instruction =  {
      type,
      values: [
        Number.isNaN(firstValueNumber) ? firstValue : firstValueNumber,
        secondValue ? Number.isNaN(secondValueNumber) ? secondValue : secondValueNumber : null
      ]
    };
    return instruction;
  });
};

export class Duet {

  registers: Registers;
  instructions: Instruction[];
  currentInstructionIndex: number = 0;
  lastSoundFrequency: number;
  recoveredSound: number;
  deadLock = false;

  constructor(registers: Registers, instructions: Instruction[]) {
    this.registers = registers;
    this.instructions = instructions;
  }

  jump(condition: number, value: number) {
    if (condition > 0) {
      this.currentInstructionIndex += value;
      return;
    }
    this.currentInstructionIndex++;
  }

  rcv(registerName: string) {
    const condition = this.registers[registerName];
    if (condition === 0) {
      this.currentInstructionIndex++;
      return;
    }
    if (this.lastSoundFrequency === undefined) {
      throw new Error('nothing to recover yet');
    }
    this.recoveredSound = this.lastSoundFrequency;
    this.currentInstructionIndex++;
  }

  snd(value: number) {
    this.lastSoundFrequency = value;
    this.currentInstructionIndex++;
  }

  runInstruction() {
    const currentInstruction = this.instructions[this.currentInstructionIndex];
    if (currentInstruction === undefined) {
      this.deadLock = true;
      return;
    }
    const firstStatement = currentInstruction.values[0];
    const secondStatement = currentInstruction.values[1];
    let firstValue = 0;
    let secondValue = 0;
    if (typeof firstStatement === 'number') {
      firstValue = firstStatement;
    }
    if (typeof secondStatement === 'number') {
      secondValue = secondStatement;
    }
    if (typeof firstStatement === 'string') {
      firstValue = this.registers[firstStatement];
    }
    if (typeof secondStatement === 'string') {
      secondValue = this.registers[secondStatement];
    }
    if (currentInstruction.type === 'snd') {
      this.snd(firstValue);
    }
    if (currentInstruction.type === 'rcv') {
      if (typeof firstStatement !== 'string') {
        throw new Error('rcv value should be a string');
      }
      this.rcv(firstStatement);
    }
    if (currentInstruction.type === 'jgz') {
      this.jump(firstValue, secondValue);
    }
    if (currentInstruction.type === 'set') {
      this.registers[firstStatement] = secondValue;
      this.currentInstructionIndex++;
    }
    if (currentInstruction.type === 'add') {
      this.registers[firstStatement] += secondValue;
      this.currentInstructionIndex++;
    }
    if (currentInstruction.type === 'mul') {
      this.registers[firstStatement] *= secondValue;
      this.currentInstructionIndex++;
    }
    if (currentInstruction.type === 'mod') {
      if (secondValue === 0) {
        throw new Error('cannot divide by zero');
      }
      this.registers[firstStatement] = firstValue % secondValue;
      this.currentInstructionIndex++;
    }
  }

  findRecoveredSound() {
    while (this.recoveredSound === undefined) {
      this.runInstruction();
    }
    return this.recoveredSound;
  }
}

export const day17Part1Factory = (input: string) => {
  const instructions = parseInstructions(input, splitByRows);
  const registers = generateRegisters();
  const duet = new Duet(registers, instructions);
  return duet.findRecoveredSound();
};