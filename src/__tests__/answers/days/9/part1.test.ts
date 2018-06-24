import { calculateGroupsScore, cleanUpGarbage } from '../../../../answers/days/9/part1';

describe('day 9, part 1', () => {
  describe('clean up garbage function', () => {
    it('should remove everything', () => {
      expect(cleanUpGarbage('<>').cleanInput).toBe('');
      expect(cleanUpGarbage('<random characters>').cleanInput).toBe('');
      expect(cleanUpGarbage('<<<<>').cleanInput).toBe('');
      expect(cleanUpGarbage('<{!>}>').cleanInput).toBe('');
      expect(cleanUpGarbage('<!!>').cleanInput).toBe('');
      expect(cleanUpGarbage('<!!!>>').cleanInput).toBe('');
      expect(cleanUpGarbage('<{o"i!a,<{i<a>').cleanInput).toBe('');
      expect(cleanUpGarbage('<>').cleanInput).toBe('');
    });
    it('should remove only garbage', () => {
      expect(cleanUpGarbage('{<a>,<a>,<a>,<a>}').cleanInput).toBe('{,,,}');
      expect(cleanUpGarbage('{{<a>},{<a>},{<a>},{<a>}}').cleanInput).toBe('{{},{},{},{}}');
      expect(cleanUpGarbage('{{<!>},{<!>},{<!>},{<a>}}').cleanInput).toBe('{{}}');
      expect(cleanUpGarbage('<{!>}>').cleanInput).toBe('');
      expect(cleanUpGarbage('<!!>').cleanInput).toBe('');
      expect(cleanUpGarbage('<!!!>>').cleanInput).toBe('');
      expect(cleanUpGarbage('<{o"i!a,<{i<a>').cleanInput).toBe('');
      expect(cleanUpGarbage('<>').cleanInput).toBe('');
    });
    it('should calculate garbage score correctly', () => {
      expect(cleanUpGarbage('<>').score).toBe(0);
      expect(cleanUpGarbage('<random characters>').score).toBe(17);
      expect(cleanUpGarbage('<<<<>').score).toBe(3);
      expect(cleanUpGarbage('<{!>}>').score).toBe(2);
      expect(cleanUpGarbage('<!!>').score).toBe(0);
      expect(cleanUpGarbage('<!!!>>').score).toBe(0);
      expect(cleanUpGarbage('<{o"i!a,<{i<a>').score).toBe(10);
    });
  });

  describe('calculate groups score function', () => {
    it('should calculate the score correctly', () => {
      expect(calculateGroupsScore('{}', cleanUpGarbage)).toBe(1);
      expect(calculateGroupsScore('{{{}}}', cleanUpGarbage)).toBe(6);
      expect(calculateGroupsScore('{{},{}}', cleanUpGarbage)).toBe(5);
      expect(calculateGroupsScore('{{{},{},{{}}}}', cleanUpGarbage)).toBe(16);
      expect(calculateGroupsScore('{<a>,<a>,<a>,<a>}', cleanUpGarbage)).toBe(1);
      expect(calculateGroupsScore('{{<ab>},{<ab>},{<ab>},{<ab>}}', cleanUpGarbage)).toBe(9);
      expect(calculateGroupsScore('{{<!!>},{<!!>},{<!!>},{<!!>}}', cleanUpGarbage)).toBe(9);
      expect(calculateGroupsScore('{{<a!>},{<a!>},{<a!>},{<ab>}}', cleanUpGarbage)).toBe(3);
    });
  });
});