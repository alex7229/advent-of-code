import {
  DanceMove, Exchange,
  getDanceMoves, Partner, performDance,
  performExchange,
  performPartner,
  performSpin
} from '../../../../answers/days/16/part1';

describe('day 16, part 1', () => {

  describe('get dance moves function', () => {
    it('should throw if moves string is incorrect', () => {
      const incorrectPartner = 'pz/m,s8,x5/12';
      const incorrectSpin = 'pe/m,ss,x5/12';
      const incorrectExchange = 'pe/m,s8,x512';
      expect(() => getDanceMoves(incorrectExchange)).toThrow();
      expect(() => getDanceMoves(incorrectPartner)).toThrow();
      expect(() => getDanceMoves(incorrectSpin)).toThrow();
    });
    it('should parse moves correctly', () => {
      const moves = 'pe/m,s8,x5/12';
      const parsedMoves: DanceMove[] = [
        { type: 'partner', values: ['e', 'm'] },
        { type: 'spin', values: 8 },
        { type: 'exchange', values: [5, 12] }
      ];
      expect(getDanceMoves(moves)).toEqual(parsedMoves);
    });
  });

  describe('spin function', () => {
    it('should perform the spin move correctly', () => {
      expect(performSpin('abcde', { type: 'spin', values: 3 })).toBe('cdeab');
      expect(performSpin('abcde', { type: 'spin', values: 1 })).toBe('eabcd');
      expect(performSpin('abcde', { type: 'spin', values: 0 })).toBe('abcde');
    });
    it('should throw if spin number is higher than positions number', () => {
      expect(() => performSpin('ab', { type: 'spin', values: 5 })).toThrow();
    });
  });

  describe('exchange function', () => {
    it('should perform the exchange correctly', () => {
      const exchange: Exchange = { type: 'exchange', values: [0, 2] };
      expect(performExchange('abcd', exchange)).toBe('cbad');
});
    it('should throw if exchange numbers are incorrect', () => {
      const exchange: Exchange = { type: 'exchange', values: [1, 5] };
      expect(() => performExchange('ab', exchange)).toThrow();
    });
  });

  describe('partner function', () => {
    it('should perform partner correctly', () => {
      const partner: Partner = { type: 'partner', values: ['e', 'b'] };
      expect(performPartner('abcde', partner, performExchange)).toBe('aecdb');
    });
    it('should throw if character is not present in the string', () => {
      const partner: Partner = { type: 'partner', values: ['z', 'x'] };
      expect(() => performPartner('ab', partner, jest.fn())).toThrow();
    });
  });

  describe('perform dance function', () => {
    it('should perform the dance correctly', () =>{
      const functions = {
        spin: performSpin,
        partner: performPartner,
        exchange: performExchange
      };
      const moves: DanceMove[] = [
        { type: 'spin', values: 1 },
        { type: 'exchange', values: [3, 4] },
        { type: 'partner', values: ['e', 'b'] }
      ];
      expect(performDance('abcde', moves, functions)).toBe('baedc');
    });
  });

});