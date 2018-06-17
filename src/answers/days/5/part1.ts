import { splitByRows } from '../../../utils';

export class Jumper {

  instructions: number[];
  currentPlace: number;
  steps: number;

  constructor(instructions: string[]) {
    this.instructions = this.convertInstructions(instructions);
    this.currentPlace = 0;
    this.steps = 0;
  }

  convertInstructions(instructionsString: string[]) {
    return instructionsString.map(instr => parseInt(instr, 10));
  }

  isPlaceValid() {
    return this.currentPlace >= 0 && this.currentPlace < this.instructions.length;
  }

  runInstruction() {
    this.steps++;
    let instruction = this.instructions[this.currentPlace];
    const currentPlace = this.currentPlace;
    this.currentPlace += instruction;
    this.instructions[currentPlace] ++;
  }

  getSteps(): number {
    while (this.isPlaceValid()) {
      this.runInstruction();
    }
    return this.steps;
  }
}

export const day5Part1Factory = (input: string) =>
  new Jumper(splitByRows(input)).getSteps();