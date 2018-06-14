import * as _ from 'lodash';
import {
  Field, getDistance,
  getField,
  getNextDesiredDirection, getNextPosition, getPosition,
  getPossibleDirections,
  PossibleDirections
} from '../../../../answers/days/3/solveFirstPart';

describe('day 3, part 1', () => {

  const defaultSize = 20;
  const startPosition = {
    row: 10,
    column: 10
  };
  let defaultField: Field = [];
  for (let row = 0; row < defaultSize; row ++) {
    defaultField.push([]);
    for (let column = 0; column < defaultSize; column ++) {
      defaultField[row].push(null)
    }
  }

  describe('get desired direction function', () => {

    const possibleDirections: PossibleDirections = {
      up: true,
      down: true,
      left: true,
      right: true
    };

    it('down -> right if possible', () => {
      const previousDirection = 'down';
      expect(getNextDesiredDirection(previousDirection, possibleDirections)).toBe('right');
      const rightBlocked = {
        ...possibleDirections,
        right: false
      };
      expect(getNextDesiredDirection(previousDirection, rightBlocked)).toBe('down');
    });

    it('right -> up if possible', () => {
      const previousDirection = 'right';
      expect(getNextDesiredDirection(previousDirection, possibleDirections)).toBe('up');
      const upBlocked = {
        ...possibleDirections,
        up: false
      };
      expect(getNextDesiredDirection(previousDirection, upBlocked)).toBe('right');
    });

    it('up -> left if possible', () => {
      const previousDirection = 'up';
      expect(getNextDesiredDirection(previousDirection, possibleDirections)).toBe('left');
      const leftBlocked = {
        ...possibleDirections,
        left: false
      };
      expect(getNextDesiredDirection(previousDirection, leftBlocked)).toBe('up');
    });

    it('left -> down if possible', () => {
      const previousDirection = 'left';
      expect(getNextDesiredDirection(previousDirection, possibleDirections)).toBe('down');
      const downBlocked = {
        ...possibleDirections,
        down: false
      };
      expect(getNextDesiredDirection(previousDirection, downBlocked)).toBe('left');
    });

  });

  describe('get possible directions function', () => {
    it('should return all directions for null cells', () => {
      const field = _.cloneDeep(defaultField);
      expect(getPossibleDirections(startPosition, field)).toEqual({
        up: true,
        down: true,
        left: true,
        right: true
      });
      let upAndLeft = _.cloneDeep(field);
      upAndLeft[11][10] = 2;
      upAndLeft[10][11] = 44;
      expect(getPossibleDirections(startPosition, upAndLeft)).toEqual({
        up: true,
        down: false,
        left: true,
        right: false
      });
      let downAndRight = _.cloneDeep(field);
      downAndRight[9][10] = 2;
      downAndRight[10][9] = 23;
      expect(getPossibleDirections(startPosition, downAndRight)).toEqual({
        up: false,
        down: true,
        left: false,
        right: true
      })
    })
  });

  describe('get next position function', () => {
    it('should get correct next position', () => {
      const position = { row: 10, column: 10 };
      expect(getNextPosition('up', {... position})).toEqual({ row: 9, column: 10 });
      expect(getNextPosition('down', {...position})).toEqual({ row: 11, column: 10 });
      expect(getNextPosition('left', {...position})).toEqual({ row: 10, column: 9 });
      expect(getNextPosition('right', {...position})).toEqual({ row: 10, column: 11 });
    })
  });

  describe('fill field function', () => {

    const functions = {
      getNextDesiredDirection: jest.fn(),
      getPossibleDirections: jest.fn(),
      getNextPosition: jest.fn()
    };

    it('should fill one number on start position correctly', () => {
      let field = _.cloneDeep(defaultField);
      field[startPosition.row][startPosition.column] = 4;
      expect(getField(defaultSize, startPosition, 4, 4, functions)).toEqual(field);
    });

    it('should fill numbers correctly', () => {
      const functions = {
        getNextPosition: getNextPosition,
        getNextDesiredDirection: getNextDesiredDirection,
        getPossibleDirections: getPossibleDirections
      };
      const field = getField(defaultSize, startPosition, 1, 30, functions);
      // position on top of start
      expect(field[startPosition.row - 1][startPosition.column]).toBe(4);
      // lower by two rows and one to the left
      expect(field[startPosition.row + 2][startPosition.column - 1]).toBe(22);
    })

  });

  describe('get position function', () => {

    it('should throw if position was not found', () => {
      let field = _.cloneDeep(defaultField);
      expect(() => getPosition(2, field)).toThrow();
    });

    it('should find correct positions', () => {
      let field = _.cloneDeep(defaultField);
      field[7][4] = 23;
      field[2][11] = 17;
      expect(getPosition(23, field)).toEqual({ row: 7, column: 4 });
      expect(getPosition(17, field)).toEqual( { row: 2, column: 11 });
    })
  });

  describe('get distance function', () => {
    it('should calculate distance correctly', () => {
      const middle = { row: 10, column: 10 };
      const bottomLeft = { row: 12, column: 7 };
      const bottomRight = { row: 12, column: 12 };
      const topLeft = { row: 7, column: 7 };
      const topRight = { row: 7, column: 12 };
      expect(getDistance(middle, bottomLeft)).toBe(5);
      expect(getDistance(middle, bottomRight)).toBe(4);
      expect(getDistance(middle, topRight)).toBe(5);
      expect(getDistance(middle, topLeft)).toBe(6);
    })
  });

  describe('real tests', () => {
    const functions = {
      getNextDesiredDirection: getNextDesiredDirection,
      getPossibleDirections: getPossibleDirections,
      getNextPosition: getNextPosition
    };
    const size = 50;
    const startPosition = { column: size / 2, row: size / 2 };
    const limit = 1050;
    const field = getField(size,  startPosition, 1, limit, functions);
    expect(getDistance(startPosition, getPosition(1, field))).toBe(0);
    expect(getDistance(startPosition, getPosition(12, field))).toBe(3);
    expect(getDistance(startPosition, getPosition(23, field))).toBe(2);
    expect(getDistance(startPosition, getPosition(1024, field))).toBe(31);
  })

});