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

describe('day 4, part 1', () => {
  it('part 1', () => {
    expect(answersWrappers.day4.part1('aa bb cc dd ee\naa bb cc dd aad aa\naa bb cc dd aaa')).toBe(2);
  });
});