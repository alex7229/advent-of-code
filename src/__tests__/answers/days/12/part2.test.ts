import { findAllConnectedProgramsFactory, Program } from '../../../../answers/days/12/part1';
import { findAllGroups } from '../../../../answers/days/12/part2';

describe('day 12, part 2', () => {
  describe('find all groups function', () => {
    it('should find all groups correctly', () => {
      const programs: Program[] = [
        { id: 0, connectedIds: [1] },
        { id: 1, connectedIds: [2, 3] },
        { id: 4, connectedIds: [] }
      ];
      expect(findAllGroups(programs, findAllConnectedProgramsFactory)).toEqual([[1, 0, 2, 3], [4]]);
    });
  });
});