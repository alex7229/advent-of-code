import { MemoryAllocator2 } from '../../../../answers/days/6/part2';

describe('day 6, part 2', () => {
  it('should find proper loop length', () => {
    const allocator = new MemoryAllocator2('');
    allocator.banks = [0, 2, 7, 0];
    expect(allocator.findLoopLength()).toBe(4);
  });
});