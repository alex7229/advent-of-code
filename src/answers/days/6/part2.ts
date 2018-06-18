import { MemoryAllocator } from './part1';

export class MemoryAllocator2 extends MemoryAllocator {
  constructor(banks: string) {
    super(banks);
  }

  findLoopLength() {
    this.findCyclesNumber();
    this.banksHistory = [];
    return this.findCyclesNumber();
  }
}

export const day6Part2Factory = (input: string) =>
  new MemoryAllocator2(input).findLoopLength();