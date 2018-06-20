import {
  findRootTower,
  getInformation,
  Information,
  InformationPart,
  parseLine
} from '../../../../answers/days/7/part1';
import { splitByRows } from '../../../../utils';

describe('day 7, part 1', () => {

  // todo: delete everything from here
  // todo: just find the tower which is not included in any other tower. That's all

  const input = 'pbga (66)\n' +
    'xhth (57)\n' +
    'ebii (61)\n' +
    'havc (66)\n' +
    'ktlj (57)\n' +
    'fwft (72) -> ktlj, cntj, xhth\n' +
    'qoyq (66)\n' +
    'padx (45) -> pbga, havc, qoyq\n' +
    'tknk (41) -> ugml, padx, fwft\n' +
    'jptl (61)\n' +
    'ugml (68) -> gyxo, ebii, jptl\n' +
    'gyxo (61)\n' +
    'cntj (57)';

  describe('parse line function', () => {
    it('should throw if no matches were found', () => {
      expect(() => parseLine('')).toThrow();
    });

    it('should parse correctly', () => {
      expect(parseLine('snslv (48)')).toEqual(
        { name: 'snslv', weight: 48, holds: []}
      );
      expect(parseLine('iuctosc (12) -> bqmayvq, yjzvbcb, takuy, qlsfhyp')).toEqual({
        name: 'iuctosc',
        weight: 12,
        holds: ['bqmayvq', 'yjzvbcb', 'takuy', 'qlsfhyp']
      });
    });
  });

  describe('get information function', () => {
    it('should create object information correctly', () => {
      const rows = ['row1', 'row2'];
      const informationParts: InformationPart[] = [
        { name: 'as', weight: 12, holds: [] },
        { name: 'sd', weight: 52, holds: ['asd', 'a']}
      ];
      const expectedInfoObject: Information = {
        as: { weight: 12, holds: [] },
        sd: { weight: 52, holds: ['asd', 'a']}
      };
      const splitByRowsMock = jest.fn().mockReturnValue(rows);
      const parseLineMock = jest.fn()
        .mockReturnValueOnce(informationParts[0])
        .mockReturnValueOnce(informationParts[1]);
      expect(getInformation('', parseLineMock, splitByRowsMock)).toEqual(expectedInfoObject);
    });
  });

  describe('find root tower function', () => {
    it('should throw if information object is empty, multiple roots', () => {
      const multipleRoots: Information = {
        as: { weight: 2, holds: ['fs'] },
        ba: { weight: 3, holds: [] }
      };
      expect(() => findRootTower({})).toThrow();
      expect(() => findRootTower(multipleRoots)).toThrow();
    });

    it('should find root correctly', () => {
      const information = getInformation(input, parseLine, splitByRows);
      expect(findRootTower(information)).toBe('tknk');
    });
  });

});