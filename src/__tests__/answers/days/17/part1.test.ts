import { findNextDirectNumber, insert } from '../../../../answers/days/17/part1';
import { Buffer } from '../../../../answers/days/17/part1';

describe('day 17, part 1', () => {
  it('insert function', () => {
    let buffer: Buffer = { values: [0], position: 0 };
    while (buffer.values.length < 10) {
      buffer = insert(buffer, 3);
    }
    // there is minor difference -> 0 is always at the end instead of the start
    expect(buffer.values).toEqual([9, 5, 7, 2, 4, 3, 8, 6, 1, 0]);
  });
  it('find number after 2017', () => {
    expect(findNextDirectNumber(2017, 3, insert)).toBe(638);
  });
});