import { Jumper2 } from '../../../../answers/days/5/part2';

describe('day 5, part 2', () => {
  describe('run instructions method', () => {
    it('instructions are decreased by 1 if the jump offset is 3 or more', () => {
      const jumper = new Jumper2(['2', '0', '3']);
      jumper.runInstruction();
      expect(jumper.steps).toBe(1);
      expect(jumper.currentPlace).toBe(2);
      expect(jumper.instructions).toEqual([3, 0, 3]);
      jumper.runInstruction();
      expect(jumper.steps).toBe(2);
      expect(jumper.currentPlace).toBe(5);
      expect(jumper.instructions).toEqual([3, 0, 2]);
    });
  });
});