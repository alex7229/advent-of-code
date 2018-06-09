import { findArraySum } from '../utils';

describe('findArraySum', () => {

  it('calculate sum of numbers correctly', () => {
    expect(findArraySum([2, 5, 2])).toBe(9);
  });

});