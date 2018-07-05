import { countSendValues, DuetMulti } from '../../../../answers/days/18/part2';
import { generateRegisters, Instruction, parseInstructions } from '../../../../answers/days/18/part1';
import { splitByRows } from '../../../../utils';

describe('day 18, part 2', () => {

  const getDuet = () => new DuetMulti(generateRegisters(), []);

  it('snd instruction should add values to an appropriate array', () => {
    const duet = getDuet();
    duet.instructions = [{ type: 'snd', values: ['c', null] }];
    duet.runInstruction();
    expect(duet.valuesForSend).toEqual([0]);
    expect(duet.currentInstructionIndex).toBe(1);
  });

  it('rcv instruction should set the value if received values have data', () => {
    const duet = getDuet();
    duet.instructions = [{ type: 'rcv', values: ['a', null] }];
    duet.receivedValues = [2, 17];
    duet.runInstruction();
    expect(duet.registers.a).toBe(2);
    expect(duet.receivedValues).toEqual([17]);
  });
  it('should initiate deadlock if received values are empty and rcv instruction is triggered', () => {
    const duet = getDuet();
    duet.instructions = [{ type: 'rcv', values: ['b', null] }];
    duet.runInstruction();
    expect(duet.currentInstructionIndex).toBe(0);
    expect(duet.deadLock).toBe(true);
  });

  it('should run instructions until deadlock', () => {
    const duet = getDuet();
    duet.instructions = [
      { type: 'add', values: ['c', 23] },
      { type: 'snd', values: ['c', null] },
      { type: 'rcv', values: ['b', null] }
    ];
    duet.run();
    expect(duet.valuesForSend).toEqual([23]);
    expect(duet.currentInstructionIndex).toBe(2);
    expect(duet.deadLock).toBe(true);
  });

  it('should run programs correctly and find send values count', () => {
    const firstProgramInput = 'snd 1\n' +
      'snd 2\n' +
      'snd p\n' +
      'rcv a\n' +
      'rcv b\n' +
      'rcv c\n' +
      'rcv d';
    const secondProgramInput = 'snd 1\n' +
      'snd 2\n' +
      'snd p\n' +
      'snd c\n' +
      'rcv a\n' +
      'rcv b\n' +
      'rcv c\n' +
      'rcv d';
    const firstInstructions = parseInstructions(firstProgramInput, splitByRows);
    const secondInstructions = parseInstructions(secondProgramInput, splitByRows);
    const registers = generateRegisters();
    const firstProgram = new DuetMulti(registers, firstInstructions);
    const secondProgram = new DuetMulti(registers, secondInstructions);
    expect(countSendValues(firstProgram, secondProgram)).toBe(4);
  });

  it('count send values should remove deadlocks if received values are present', () => {
    const firstInstructions: Instruction[] = [
      { type: 'snd', values: ['b', null] }
    ];
    const secondInstructions: Instruction[] = [
      { type: 'rcv', values: ['c', null] },
      { type: 'snd', values: ['b', null] }
    ];
    const first = new DuetMulti(generateRegisters(), firstInstructions);
    const second = new DuetMulti(generateRegisters(), secondInstructions);
    expect(countSendValues(first, second)).toBe(1);
  });
});