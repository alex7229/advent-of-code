import {
  isCaughtFactory,
  parseInput,
  runScanners
} from '../../../../answers/days/13/part1';
import { splitByRows } from '../../../../utils';
import * as _ from 'lodash';
import { findLowestDelay } from '../../../../answers/days/13/part2';

describe('day 13, part 2', () => {

  const defaultLayers = parseInput('0: 3\n1: 2\n4: 4\n6: 4', splitByRows);

  describe('find lowest delay function', () => {
    it('should find the delay correctly', () => {
      const layers = _.cloneDeep(defaultLayers);
      expect(findLowestDelay(layers, runScanners, isCaughtFactory)).toBe(10);
    });
  });
});