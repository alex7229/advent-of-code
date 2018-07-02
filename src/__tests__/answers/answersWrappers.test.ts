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
  it('part 2', () => {
    expect(answersWrappers.day7.part2(input)).toBe(60);
  });
});

describe('day 8', () => {
  const input = 'b inc 5 if a > 1\n' +
    'a inc 1 if b < 5\n' +
    'c dec -10 if a >= 1\n' +
    'c inc -20 if c == 10';
  it('part 1', () => {
    expect(answersWrappers.day8.part1(input)).toBe(1);
  });
  it('part 2', () => {
    expect(answersWrappers.day8.part2(input)).toBe(10);
  });
});

describe('day 9', () => {
  it('part 1', () => {
    const input = '{}' +
      '{{{}}}' +
      '{{},{}}' +
      '{{{},{},{{}}}}' +
      '{<a>,<a>,<a>,<a>}' +
      '{{<ab>},{<ab>},{<ab>},{<ab>}}' +
      '{{<!!>},{<!!>},{<!!>},{<!!>}}' +
      '{{<a!>},{<a!>},{<a!>},{<ab>}}';
    expect(answersWrappers.day9.part1(input)).toBe(50);
  });
  it('part 2', () => {
    const input = '<>' +
      '<random characters>' +
      '<<<<>' +
      '<{!>}>' +
      '<!!>' +
      '<!!!>>' +
      '<{o"i!a,<{i<a>';
    expect(answersWrappers.day9.part2(input)).toBe(32);
  });
});

describe('day 10', () => {
  it('part 1', () => {
    const input = '63,144,180,149,1,255,167,84,125,65,188,0,2,254,229,24';
    // that's an actual solution test
    expect(answersWrappers.day10.part1(input)).toEqual(4480);
  });
  it('part 2', () => {
    expect(answersWrappers.day10.part2('')).toBe('a2582a3a0e66e6e86e3812dcb672a272');
    expect(answersWrappers.day10.part2('AoC 2017')).toBe('33efeb34ea91902bb2f59c9920caa6cd');
    expect(answersWrappers.day10.part2('1,2,3')).toBe('3efbe78a8d82f29979031a4aa0b16a9d');
    expect(answersWrappers.day10.part2('1,2,4')).toBe('63960835bcdc130f0b66d7ff4f6a5a8e');
  });
});

describe('day 11', () => {
  it('part 1', () => {
    const input = 'ne,ne,sw,sw';
    expect(answersWrappers.day11.part1(input)).toBe(0);
  });
  it('part 2', () => {
    const input = 'ne,ne,sw,sw';
    expect(answersWrappers.day11.part2(input)).toBe(2);
  });
});

describe('day 12', () => {
  const input = '0 <-> 2\n' +
    '1 <-> 1\n' +
    '2 <-> 0, 3, 4\n' +
    '3 <-> 2, 4\n' +
    '4 <-> 2, 3, 6\n' +
    '5 <-> 6\n' +
    '6 <-> 4, 5';
  it('part 1', () => {
    expect(answersWrappers.day12.part1(input)).toEqual(6);
  });
  it('part 2', () => {
    expect(answersWrappers.day12.part2(input)).toEqual(2);
  });
});

describe('day 13', () => {
  const input = '0: 3\n1: 2\n4: 4\n6: 4';
  it('part 1', () => {
    expect(answersWrappers.day13.part1(input)).toBe(24);
  });
  it('part 2', () => {
    expect(answersWrappers.day13.part2(input)).toBe(10);
  });
});

describe('day 14', () => {
  const input = 'flqrgnkx';
  it('part 1', () => {
    expect(answersWrappers.day14.part1(input)).toBe(8108);
  });
  it('part 2', () => {
    expect(answersWrappers.day14.part2(input)).toBe(1242);
  });
});

describe('day 15', () => {
  const input =
    'Generator A starts with 65\n' +
    'Generator B starts with 8921';
  it('part 1', () => {
    expect(answersWrappers.day15.part1(input, 2)).toBe(0);
    expect(answersWrappers.day15.part1(input, 3)).toBe(1);
  });
  it('part 2', () => {
    expect(answersWrappers.day15.part2(input, 1055)).toBe(0);
    expect(answersWrappers.day15.part2(input, 1056)).toBe(1);
  });
});