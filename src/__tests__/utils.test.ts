import { findArraySum, splitByRows } from '../utils';

describe('findArraySum', () => {

  it('calculate sum of numbers correctly', () => {
    expect(findArraySum([2, 5, 2])).toBe(9);
  });

});

describe('split by rows function', () => {

  it('should return row if it is the only one row', () => {
    expect(splitByRows('row')).toEqual(['row']);
  });

  it('should split by rows correctly', () => {
    const rows = `ra\nba\nsa\n`;
    expect(splitByRows(rows)).toEqual(['ra', 'ba', 'sa']);
  });

});