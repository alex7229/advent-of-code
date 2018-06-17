export class MemoryAllocator {

  banks: number[];
  banksHistory: string[] = [];

  constructor(banks: string) {
    this.banks = this.parseBanks(banks);
  }

  findCyclesNumber() {
    let cycles = 0;
    while (!this.hasCycleBeenSeen()) {
      this.saveValues();
      this.distribute();
      cycles++;
    }
    return cycles;
  }

  hasCycleBeenSeen() {
    const bankString = this.banks.join('\t');
    return this.banksHistory.includes(bankString);
  }

  findBiggestBankIndex(): number {
    let value = 0;
    let index = 0;
    this.banks.forEach((bankValue, bankIndex) => {
      if (bankValue > value) {
        value = bankValue;
        index = bankIndex;
      }
    });
    return index;
  }

  distribute() {
    const biggestIndex = this.findBiggestBankIndex();
    let spareValue = this.banks[biggestIndex];
    this.banks[biggestIndex] = 0;
    let currentIndex = biggestIndex + 1;
    while (spareValue > 0) {
      if (this.banks[currentIndex] === undefined) {
        currentIndex = 0;
      }
      this.banks[currentIndex]++;
      currentIndex++;
      spareValue--;
    }
  }

  saveValues() {
    this.banksHistory.push(this.banks.join('\t'));
  }

  private parseBanks(banks: string): number[] {
    return banks
      .split('\t')
      .map(bankString => parseInt(bankString, 10));
  }
}

export const day6Part1Factory = (input: string) =>
  new MemoryAllocator(input).findCyclesNumber();