import {
  Duet,
  generateRegisters,
  Instruction,
  parseInstructions
} from '../../../../answers/days/18/part1';
import { splitByRows } from '../../../../utils';

describe('day 18, part 1', () => {
  describe('generate registers function', () => {
    it('should generate correct default registers', () => {
      const registers = generateRegisters();
      expect(Object.keys(registers).length).toBe(26);
      expect(Object.values(registers).every(register => register === 0)).toBe(true);
    });
  });

  describe('parse instructions function', () => {
    it('should parse instructions correctly', () => {
      const input = 'set a 1\n' +
        'add a 2\n' +
        'mul c a\n' +
        'mod a 5\n' +
        'snd z\n' +
        'rcv a\n' +
        'jgz a -1\n';
      const instructions: Instruction[] = [
        { type: 'set', values: ['a', 1] },
        { type: 'add', values: ['a', 2] },
        { type: 'mul', values: ['c', 'a'] },
        { type: 'mod', values: ['a', 5] },
        { type: 'snd', values: ['z', null] },
        { type: 'rcv', values: ['a', null] },
        { type: 'jgz', values: ['a', -1] }
      ];
      expect(parseInstructions(input, splitByRows)).toEqual(instructions);
    });
  });

  describe('class duet', () => {

    const getDuet = () => new Duet(generateRegisters(), []);

    it('run instruction should trigger deadlock if instruction index is out of bounds', () => {
      const duet = getDuet();
      duet.instructions = [{ type: 'set', values: ['a', 3] }];
      duet.currentInstructionIndex = 23;
      duet.runInstruction();
      expect(duet.deadLock).toBe(true);
      expect(duet.currentInstructionIndex).toBe(23);
    });
    it('snd should save its frequency', () => {
      const duet = getDuet();
      duet.instructions = [{ type: 'snd', values: ['b', null] }];
      duet.registers.b = 17;
      expect(duet.lastSoundFrequency).toBe(undefined);
      duet.runInstruction();
      expect(duet.lastSoundFrequency).toBe(17);
    });

    describe('rcv instruction', () => {
      it('should throw if no sound was played', () => {
        const duet = getDuet();
        duet.instructions = [{ type: 'rcv', values: ['a', null]} ];
        duet.registers.a = 17;
        expect(() => duet.runInstruction()).toThrow();
      });

      it('should not trigger if the value is 0', () => {
        const duet = getDuet();
        duet.instructions = [{ type: 'rcv', values: ['a', null]} ];
        duet.runInstruction();
        expect(duet.recoveredSound).toBe(undefined);
      });
      it('should save the value as expected', () => {
        const duet = getDuet();
        duet.instructions = [{ type: 'rcv', values: ['a', null]} ];
        duet.lastSoundFrequency = 23;
        duet.registers.a = 22;
        duet.runInstruction();
        expect(duet.recoveredSound).toBe(23);
      });
      it('should throw if value is a number', () => {
        const duet = getDuet();
        duet.instructions = [{ type: 'rcv', values: [2, null] }];
        expect(() => duet.runInstruction()).toThrow();
      });
    });

    describe('jump instruction', () => {
      it('should call jump with correct values', () => {
        const duet = getDuet();
        duet.instructions = [
          { type: 'jgz', values: ['a', 2] },
          { type: 'jgz', values: [5, 7] }
        ];
        const jumpMock = jest.fn();
        duet.jump = jumpMock;
        duet.runInstruction();
        expect(jumpMock.mock.calls.length).toBe(1);
        expect(jumpMock.mock.calls[0]).toEqual([0, 2]);
        duet.currentInstructionIndex++;
        duet.runInstruction();
        expect(jumpMock.mock.calls.length).toBe(2);
        expect(jumpMock.mock.calls[1]).toEqual([5, 7]);
      });
      it('should not jump if value is less than 0', () => {
        const duet = getDuet();
        duet.jump(-2, 5);
        expect(duet.currentInstructionIndex).toBe(1);
        duet.jump(3, 17);
        expect(duet.currentInstructionIndex).toBe(18);
      });
    });

    it('should set the value correctly', () => {
      const duet = getDuet();
      duet.instructions = [
        { type: 'set', values: ['a', 25] },
        { type: 'set', values: ['b', 'a'] }
      ];
      duet.runInstruction();
      duet.runInstruction();
      expect(duet.registers.a).toBe(25);
      expect(duet.registers.b).toBe(25);
    });

    it('should add the value correctly', () => {
      const duet = getDuet();
      duet.instructions = [
        { type: 'add', values: ['a', 25] },
        { type: 'add', values: ['a', 'a'] }
      ];
      duet.runInstruction();
      expect(duet.registers.a).toBe(25);
      duet.runInstruction();
      expect(duet.registers.a).toBe(50);
    });

    it('should run the multiply instruction correctly', () => {
      const duet = getDuet();
      duet.instructions = [
        { type: 'mul', values: ['a', 5] },
        { type: 'mul', values: ['b', 'a'] }
      ];
      duet.registers.a = 10;
      duet.registers.b = 2;
      duet.runInstruction();
      duet.runInstruction();
      expect(duet.registers.a).toBe(50);
      expect(duet.registers.b).toBe(100);
    });

    describe('modulo instruction', () => {
      it('should throw if modulo value is 0', () => {
        const duet = getDuet();
        duet.instructions = [{ type: 'mod', values: ['a', 0] }];
        expect(() => duet.runInstruction()).toThrow();
      });
      it('should run the modulo instruction correctly', () => {
        const duet = getDuet();
        duet.instructions = [
          { type: 'mod', values: ['a', 5] },
          { type: 'mod', values: ['b', 'a'] }
        ];
        duet.registers.a = 12;
        duet.registers.b = 3;
        duet.runInstruction();
        duet.runInstruction();
        expect(duet.registers.a).toBe(2);
        expect(duet.registers.b).toBe(1);
      });
    });

    it('find recovered sound function', () => {
      const input =
        'set a 1\n' +
        'add a 2\n' +
        'mul a a\n' +
        'mod a 5\n' +
        'snd a\n' +
        'set a 0\n' +
        'rcv a\n' +
        'jgz a -1\n' +
        'set a 1\n' +
        'jgz a -2';
      const instructions = parseInstructions(input, splitByRows);
      const duet = new Duet(generateRegisters(), instructions);
      expect(duet.findRecoveredSound()).toBe(4);
    });

  });

});