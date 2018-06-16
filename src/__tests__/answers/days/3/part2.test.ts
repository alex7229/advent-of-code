import { Field } from '../../../../answers/days/3/part1';
import { getAnswer, getLargerNumber, getNeighbourCellsSum } from '../../../../answers/days/3/part2';
import * as _ from 'lodash';

describe('day 3, part 2', () => {

  const defaultField: Field = Array(5)
    .fill(0)
    .map(row => Array(5).fill(null));

  describe('get neighbour cells function', () => {

    it('should return 0 if all cells are nulls', () => {
      expect(getNeighbourCellsSum({ row: 2, column: 2}, defaultField)).toEqual(0);
    });

    it('should calculate the sum correctly', () => {
      let field = _.cloneDeep(defaultField);
      field[2][1] = 17;
      field[2][2] = 10;
      field[2][3] = 5;
      field[1][2] = 22;
      field[3][2] = 2;
      // 2.2 should not be counted
      expect(getNeighbourCellsSum({row: 2, column: 2}, field)).toBe(46);
    });

    it('should calculate sum on the edges of the field correctly', () => {
      let field = _.cloneDeep(defaultField);
      field[0][1] = 23;
      field[1][0] = 5;
      field[1][1] = 1;
      expect(getNeighbourCellsSum({row: 0, column: 0}, field)).toBe(29);
    });
  });

  describe('get answer function', () => {

    const mocks = {
      getFieldSize: jest.fn(),
      getNextDesiredDirection: jest.fn(),
      getNextPosition: jest.fn(),
      getPossibleDirections: jest.fn(),
      getNextNumber: jest.fn(),
      getField: jest.fn(),
      getPosition: jest.fn(),
      getDistance: jest.fn(),
      getLargerNumber: jest.fn()
    };

    it('should create field with correct params', () => {
      const size = 50;
      const input = 340;
      const functions = {
        ...mocks,
        getFieldSize: jest.fn().mockReturnValue(size),
        getField: jest.fn()
      };
      getAnswer(input, functions);
      expect(functions.getField.mock.calls.length).toBe(1);
      const [receivedSize, receivedStartPosition, startNumber, fillTo] = functions.getField.mock.calls[0];
      expect(receivedSize).toBe(size);
      expect(receivedStartPosition).toEqual({ row: size / 2, column: size / 2});
      expect(startNumber).toBe(1);
      expect(fillTo).toEqual(input * 10);
    });

    it('should call get large number function', () => {
      const functions = {
        ...mocks,
        getLargerNumber: jest.fn(),
        getField: jest.fn().mockReturnValue([])
      };
      getAnswer(10, functions);
      expect(functions.getLargerNumber.mock.calls.length).toBe(1);
      const [input, field] = functions.getLargerNumber.mock.calls[0];
      expect(input).toBe(10);
      expect(field).toEqual([]);
    });

  });

  describe('get larger number function', () => {

    it('should find number correctly', () => {
      let field = _.cloneDeep(defaultField);
      field[2][4] = 13;
      field[1][5] = 15;
      field[0][0] = 7;
      expect(getLargerNumber(7, field)).toBe(13);
      expect(getLargerNumber(0, field)).toBe(7);
    });

    it('should throw if higher number was not found', () => {
      let field = _.cloneDeep(defaultField);
      field[2][1] = 15;
      expect(() => getLargerNumber(18, field)).toThrow();
    });

  });

});