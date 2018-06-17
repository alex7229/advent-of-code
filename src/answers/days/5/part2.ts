import { Jumper } from './part1';
import { splitByRows } from '../../../utils';

export class Jumper2 extends Jumper {
  constructor(instructions: string[]) {
    super(instructions);
  }

  runInstruction() {
    let increase  = true;
    this.steps++;
    let instruction = this.instructions[this.currentPlace];
    if (instruction >= 3) {
      increase = false;
    }
    const currentPlace = this.currentPlace;
    this.currentPlace += instruction;
    if (increase) {
      this.instructions[currentPlace] ++;
    } else {
      this.instructions[currentPlace] --;
    }
  }
}

export const day5Part2Factory = (input: string) =>
  new Jumper2(splitByRows(input)).getSteps();