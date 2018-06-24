import { calculateGroupsScore, cleanUpGarbage } from '../../../../answers/days/9/part1';

describe('day 9, part 1', () => {
  describe('clean up garbage function', () => {
    it('should remove everything', () => {
      expect(cleanUpGarbage('<>')).toBe('');
      expect(cleanUpGarbage('<random characters>')).toBe('');
      expect(cleanUpGarbage('<<<<>')).toBe('');
      expect(cleanUpGarbage('<{!>}>')).toBe('');
      expect(cleanUpGarbage('<!!>')).toBe('');
      expect(cleanUpGarbage('<!!!>>')).toBe('');
      expect(cleanUpGarbage('<{o"i!a,<{i<a>')).toBe('');
      expect(cleanUpGarbage('<>')).toBe('');
    });
    it('should remove only garbage', () => {
      expect(cleanUpGarbage('{<a>,<a>,<a>,<a>}')).toBe('{,,,}');
      expect(cleanUpGarbage('{{<a>},{<a>},{<a>},{<a>}}')).toBe('{{},{},{},{}}');
      expect(cleanUpGarbage('{{<!>},{<!>},{<!>},{<a>}}')).toBe('{{}}');
      expect(cleanUpGarbage('<{!>}>')).toBe('');
      expect(cleanUpGarbage('<!!>')).toBe('');
      expect(cleanUpGarbage('<!!!>>')).toBe('');
      expect(cleanUpGarbage('<{o"i!a,<{i<a>')).toBe('');
      expect(cleanUpGarbage('<>')).toBe('');
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