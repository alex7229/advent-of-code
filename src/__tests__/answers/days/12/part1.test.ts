import {
  findAllConnectedPrograms,
  findDirectlyConnectedPrograms,
  parseLine,
  Program
} from '../../../../answers/days/12/part1';
import * as _ from 'lodash';

describe('day 12, part 1', () => {
  describe('parse line function', () => {
    it('should throw if line is incorrect', () => {
      const line = '0 <-> ';
      const lineWithChars = '0 <-> a';
      const badId = 'd <-> 1';
      expect(() => parseLine(line)).toThrow();
      expect(() => parseLine(lineWithChars)).toThrow();
      expect(() => parseLine(badId)).toThrow();
    });
    it('should parse lines correctly', () => {
      const simpleLine = '1 <-> 1';
      const complexLine = '2 <-> 0, 3, 4';
      expect(parseLine(simpleLine)).toEqual({ id: 1, connectedIds: [1] });
      expect(parseLine(complexLine)).toEqual({ id: 2, connectedIds: [0, 3, 4] });
    });
  });

  describe('find directly connected programs', () => {
    const defaultPrograms: Program[] = [
      { id: 2, connectedIds: [] },
      { id: 5, connectedIds: [2, 5] },
      { id: 3, connectedIds: [5, 6] }
    ];
    it('should throw if ids or programs array is empty', () => {
      expect(() => findDirectlyConnectedPrograms([], defaultPrograms, _)).toThrow();
      expect(() => findDirectlyConnectedPrograms([2], [], _)).toThrow();
    });
    it('should also return program own id', () => {
      expect(findDirectlyConnectedPrograms([2], [defaultPrograms[0]], _)).toEqual([2]);
    });
    it('should find correct programs for one id', () => {
      expect(findDirectlyConnectedPrograms([5], defaultPrograms, _)).toEqual([2, 5]);
    });
    it('should find correct programs id for multiple ids without duplication', () => {
      expect(findDirectlyConnectedPrograms([5, 3], defaultPrograms, _)).toEqual([2, 5, 6, 3]);
    });
  });

  describe('find all connected programs function', () => {
    it('find all programs for one id', () => {
      const programs: Program[] = [
        { id: 0, connectedIds: [1] },
        { id: 1, connectedIds: [2] },
        { id: 2, connectedIds: [] },
        { id: 4, connectedIds: [] }
      ];
      expect(findAllConnectedPrograms([0], programs, findDirectlyConnectedPrograms, _)).toEqual([1, 0, 2]);
    });
  });
});