import { Jumper } from '../../../../answers/days/5/part1';

describe('day 5, part 1', () => {
  it('convert instructions is converting strings to numbers', () => {
    const instructions = ['2', '5', '11'];
    const jumper = new Jumper([]);
    expect(jumper.convertInstructions(instructions)).toEqual([2, 5, 11]);
  });

  it('instance of the class is created correct state', () => {
    const jumper = new Jumper(['2', '3']);
    expect(jumper.currentPlace).toBe(0);
    expect(jumper.instructions).toEqual([2, 3]);
    expect(jumper.steps).toBe(0);
  });

  it('should validate place correctly', () => {
    const jumper = new Jumper(['2', '3']);
    expect(jumper.isPlaceValid()).toBe(true);
    jumper.currentPlace = -1;
    expect(jumper.isPlaceValid()).toBe(false);
    jumper.currentPlace = 2;
    expect(jumper.isPlaceValid()).toBe(false);
  });

  it('run instruction should increment step, change place and change instructions', () => {
    const jumper = new Jumper(['0', '-5', '0', '1', '-3']);
    // neutral step
    jumper.runInstruction();
    expect(jumper.steps).toBe(1);
    expect(jumper.currentPlace).toBe(0);
    expect(jumper.instructions).toEqual([1, -5, 0, 1, -3]);
    // positive step
    jumper.runInstruction();
    expect(jumper.steps).toBe(2);
    expect(jumper.currentPlace).toBe(1);
    expect(jumper.instructions).toEqual([2, -5, 0, 1, -3]);
    // negative step
    jumper.runInstruction();
    expect(jumper.steps).toBe(3);
    expect(jumper.currentPlace).toBe(-4);
    expect(jumper.instructions).toEqual([2, -4, 0, 1, -3]);
  });

  it('get steps should return number of steps if the step was out of bounds', () => {
    const jumper = new Jumper(['0', '3', '0', '1', '-3']);
    expect(jumper.getSteps()).toBe(5);
  });

});