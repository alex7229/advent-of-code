import { Duet, generateRegisters, Instruction, parseInstructions, Registers } from './part1';
import { splitByRows } from '../../../utils';

interface CountSendValues {
  (first: DuetMulti, second: DuetMulti): number;
}

export class DuetMulti extends Duet {

  valuesForSend: number[] = [];
  receivedValues: number[] = [];

  constructor(registers: Registers, instructions: Instruction[]) {
    super(registers, instructions);
  }

  snd(value: number) {
    this.valuesForSend.push(value);
    this.currentInstructionIndex++;
  }

  rcv(registerName: string) {
    if (this.receivedValues.length === 0) {
      this.deadLock = true;
      return;
    }
    this.registers[registerName] = this.receivedValues[0];
    this.receivedValues.shift();
    this.currentInstructionIndex++;
  }

  run() {
    while (!this.deadLock) {
      this.runInstruction();
    }
  }
}

export const countSendValues: CountSendValues = (first, second) => {
  let totalSendNumber = 0;
  while (!(first.deadLock && second.deadLock)) {
    first.run();
    second.run();
    totalSendNumber += second.valuesForSend.length;
    first.receivedValues = second.valuesForSend;
    second.valuesForSend = [];
    second.receivedValues = first.valuesForSend;
    first.valuesForSend = [];
    if (first.deadLock && first.receivedValues.length > 0) {
      first.deadLock = false;
    }
    if (second.deadLock && second.receivedValues.length > 0) {
      second.deadLock = false;
    }
  }
  return totalSendNumber;
};

export const day18Part2Factory = (input: string) => {
  const instructions = parseInstructions(input, splitByRows);
  const firstProgramRegisters = generateRegisters();
  let secondProgramRegisters = generateRegisters();
  secondProgramRegisters.p = 1;
  const firstProgram = new DuetMulti(firstProgramRegisters, instructions);
  const secondProgram = new DuetMulti(secondProgramRegisters, instructions);
  return countSendValues(firstProgram, secondProgram);
};