import { MemoryAllocator } from '../../../../answers/days/6/part1';

describe('day 6, part 1', () => {
  it('should parse banks correctly', () => {
    const allocator = new MemoryAllocator('4\t1\t15');
    expect(allocator.banks).toEqual([4, 1, 15]);
  });

  it('should find biggest bank index correctly', () => {
    const allocator = new MemoryAllocator('4\t1\t16');
    expect(allocator.findBiggestBankIndex()).toBe(2);
    allocator.banks = [4, 25, 4, 25];
    expect(allocator.findBiggestBankIndex()).toBe(1);
  });

  it('should redistribute values correctly', () => {
    const allocator = new MemoryAllocator('');
    allocator.banks = [0, 2, 7, 0];
    allocator.distribute();
    expect(allocator.banks).toEqual([2, 4, 1, 2]);
    allocator.distribute();
    expect(allocator.banks).toEqual([3, 1, 2, 3]);
    allocator.distribute();
    expect(allocator.banks).toEqual([0, 2, 3, 4]);
    allocator.distribute();
    expect(allocator.banks).toEqual([1, 3, 4, 1]);
    allocator.distribute();
    expect(allocator.banks).toEqual([2, 4, 1, 2]);
  });

  it('should save values correctly', () => {
    const allocator = new MemoryAllocator('');
    allocator.banks = [2, 4, 1, 4];
    allocator.saveValues();
    expect(allocator.banksHistory).toEqual(['2\t4\t1\t4']);
  });

  it('should check is cycle was  seen before', () => {
    const allocator = new MemoryAllocator('');
    allocator.banks = [2, 5, 5];
    allocator.saveValues();
    expect(allocator.hasCycleBeenSeen()).toBe(true);
    allocator.distribute();
    expect(allocator.hasCycleBeenSeen()).toBe(false);
  });

  it('find cycles number is correct', () => {
    const allocator = new MemoryAllocator('');
    allocator.banks = [0, 2, 7, 0];
    expect(allocator.findCyclesNumber()).toBe(5);
  });
});