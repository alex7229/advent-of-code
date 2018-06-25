import {
  Direction, getStepsCount,
  parseInput,
  removeDirections,
  simplifyDirections,
  Substitution
} from '../../../../answers/days/11/part1';

describe('day 11, part 1', () => {

  const fullSubstitution: Substitution = {  directions: ['n', 's'], substitution: null };
  const partSubstitution: Substitution = { directions: ['nw', 's'], substitution: 'sw' };

  describe('simplify directions function', () => {
    it('should use different substitutions to simplify directions at the same time', ()  => {
      const directions: Direction[] = ['n', 's', 'nw', 's', 'se'];
      const substitutions: Substitution[] = [fullSubstitution, partSubstitution];
      expect(simplifyDirections(directions, substitutions, removeDirections)).toEqual(['se', 'sw']);
    });
    it('should remove nested substitutions correctly', () => {
      const directions: Direction[] = [ 'n', 'nw', 's'];
      const substitutions: Substitution[] = [
        partSubstitution,
        { directions: ['n', 'sw'], substitution: 'nw' }
      ];
      // nw and south produce sw. Then sw provides a pair for n.
      expect(simplifyDirections(directions, substitutions, removeDirections)).toEqual(['nw']);
    });
  });

  describe('remove directions function', () => {
    it('should not add new direction if no change was made', () => {
      const directions: Direction[] = ['n', 's'];
      expect(removeDirections(directions, partSubstitution)).toEqual(directions);
    });
    it('should remove directions completely if substitute is null', () => {
      const directions: Direction[] = ['n', 's', 'sw'];
      expect(removeDirections(directions, fullSubstitution)).toEqual(['sw']);
    });
    it('should substitute directions correctly', () => {
      const directions: Direction[] = ['nw', 's', 's'];
      expect(removeDirections(directions, partSubstitution)).toEqual(['s', 'sw']);
    });
    it('should remove multiple directions at the same time', () => {
      const directions: Direction[] = ['nw', 'nw', 's', 's', 'se'];
      expect(removeDirections(directions, partSubstitution)).toEqual(['se', 'sw', 'sw']);
    });
  });

  describe('parse input function', () => {
    it('should throw if input is incorrect', () => {
      const input = 'ne,sw,sb';
      expect(() => parseInput(input)).toThrow();
    });
    it('should parse input correctly', () => {
      const input = 'ne,sw,n';
      expect(parseInput(input)).toEqual(['ne', 'sw', 'n']);
    });
  });

  describe('get steps count function', () => {
    const functions = {
      parseInput,
      removeDirections,
      simplifyDirections
    };
    it('should count steps correctly', () => {
      expect(getStepsCount(['ne', 'ne', 'ne'], functions)).toBe(3);
      expect(getStepsCount(['ne', 'ne', 'sw', 'sw'], functions)).toBe(0);
      expect(getStepsCount(['ne', 'ne', 's', 's'], functions)).toBe(2);
      expect(getStepsCount(['se', 'sw', 'se', 'sw', 'sw'], functions)).toBe(3);
    });
  });
});