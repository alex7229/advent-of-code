import { answersWrappers } from '../../answers/answersWrappers';

describe('day 1', () => {
  it('part 1', () => {
    expect(answersWrappers.day1.part1('1122')).toBe(3);
    expect(answersWrappers.day1.part1('1111')).toBe(4);
    expect(answersWrappers.day1.part1('1234')).toBe(0);
    expect(answersWrappers.day1.part1('91212129')).toBe(9);
  });
  it('part 2', () => {
    expect(answersWrappers.day1.part2('1212')).toBe(6);
    expect(answersWrappers.day1.part2('1221')).toBe(0);
    expect(answersWrappers.day1.part2('123425')).toBe(4);
    expect(answersWrappers.day1.part2('123123')).toBe(12);
    expect(answersWrappers.day1.part2('12131415')).toBe(4);
  });
});

describe('day 2', () => {
  it('part 1', () => {
    const input =
      '5\t1\t9\t5\n' +
      '7\t5\t3\n' +
      '2\t4\t6\t8';
    expect(answersWrappers.day2.part1(input)).toBe(18);
  });
  it('part 2', () => {
    const input = '5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5';
    expect(answersWrappers.day2.part2(input)).toBe(9);
  });
});

describe('day 3', () => {
  it('part 1', () => {
    expect(answersWrappers.day3.part1(1)).toBe(0);
    expect(answersWrappers.day3.part1(12)).toBe(3);
    expect(answersWrappers.day3.part1(23)).toBe(2);
    expect(answersWrappers.day3.part1(1024)).toBe(31);
  });
  it('part 2', () => {
    expect(answersWrappers.day3.part2(54)).toBe(57);
    expect(answersWrappers.day3.part2(747)).toBe(806);
  });
});

describe('day 4', () => {
  it('part 1', () => {
    expect(answersWrappers.day4.part1('aa bb cc dd ee\naa bb cc dd aad aa\naa bb cc dd aaa')).toBe(2);
  });
  it('part 2', () => {
    const input =
      'abcde fghij\n' +
      'abcde xyz ecdab\n' +
      'a ab abc abd abf abj\n' +
      'iiii oiii ooii oooi oooo\n' +
      'oiii ioii iioi iiio';
    expect(answersWrappers.day4.part2(input)).toBe(3);
  });
});

describe('day 5', () => {
  const input = '0\n3\n0\n1\n-3';
  it('part 1', () => {
    expect(answersWrappers.day5.part1(input)).toBe(5);
  });
  it('part 2', () => {
    expect(answersWrappers.day5.part2(input)).toBe(10);
  });
});
describe('day 6',  () => {
  const input = '0\t2\t7\t0';
  it('part 1', () => {
    expect(answersWrappers.day6.part1(input)).toBe(5);
  });
  it('part 2', () => {
    expect(answersWrappers.day6.part2(input)).toBe(4);
  });
});

describe('day 7',  () => {
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
  it('part 1', () => {
    expect(answersWrappers.day7.part1(input)).toBe('tknk');
  });
});