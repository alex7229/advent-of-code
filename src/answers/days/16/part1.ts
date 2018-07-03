interface Spin {
  type: 'spin';
  values: number;
}
export interface Exchange {
  type: 'exchange';
  values: [number, number];
}
export interface Partner {
  type: 'partner';
  values: [string, string];
}
export type DanceMove = Spin | Exchange | Partner;

interface GetDanceMoves {
  (input: string): DanceMove[];
}

interface PerformSpin {
  (positions: string, spin: Spin): string;
}

interface PerformExchange {
  (positions: string, exchange: Exchange): string;
}

interface PerformPartner {
  (positions: string, partner: Partner, performExchange: PerformExchange): string;
}

interface PerformDance {
  (
    positions: string,
    moves: DanceMove[],
    functions: {
      spin: PerformSpin,
      exchange: PerformExchange,
      partner: PerformPartner
    }
  ): string;
}

export const getDanceMoves: GetDanceMoves = input =>
  input
    .split(',')
    .map(move => {
      const spinRegExp = /s(\d+)/;
      const exchangeRegExp = /x(\d+)\/(\d+)/;
      const partnerRegExp = /p([a-p]+)\/([a-p]+)/;

      let parsedMove: DanceMove | undefined;

      const spinMatch = move.match(spinRegExp);
      if (spinMatch !== null) {
        parsedMove =  {
          type: 'spin',
          values: parseInt(spinMatch[1], 10)
        };
      }

      const exchangeMatch = move.match(exchangeRegExp);
      if (exchangeMatch !== null) {
        parsedMove = {
          type: 'exchange',
          values: [parseInt(exchangeMatch[1], 10), parseInt(exchangeMatch[2], 10)]
        };
      }

      const partnerMatch = move.match(partnerRegExp);
      if (partnerMatch !== null) {
        parsedMove = { type: 'partner', values: [partnerMatch[1], partnerMatch[2]] };
      }

      if (parsedMove !== undefined) {
        return parsedMove;
      }
      throw new Error(`moves are incorrect. Move ${move} is not recognized`);
    });

export const performSpin: PerformSpin = (positions, spin) => {
  if (spin.values === 0) {
    return positions;
  }
  if (spin.values > positions.length) {
    throw new Error('spin is incorrect');
  }
  return positions.slice(-spin.values) + positions.slice(0, positions.length - spin.values);
};

export const performExchange: PerformExchange = (positions, exchange) => {
  if (exchange.values[0] > positions.length || exchange.values[1] > positions.length) {
    throw new Error('exchange move is incorrect');
  }
  // split and join are used because it's not allowed to change string like that string[2]
  let exchangedPositions = positions.split('');
  exchangedPositions[exchange.values[0]] = positions[exchange.values[1]];
  exchangedPositions[exchange.values[1]] = positions[exchange.values[0]];
  return exchangedPositions.join('');
};

export const performPartner: PerformPartner = (positions, partner, performExchangeFunc) => {
  const firstIndex = positions.search(partner.values[0]);
  const secondIndex = positions.search(partner.values[1]);
  if (firstIndex === -1 || secondIndex === -1) {
    throw new Error('partner is not correct');
  }
  const exchange: Exchange = {
    type: 'exchange',
    values: [firstIndex,  secondIndex]
  };
  return performExchangeFunc(positions, exchange);
};

export const performDance: PerformDance = (positions, moves, functions) => {
  let currentPositions = positions;
  for (const move of moves) {
    if (move.type === 'spin') {
      currentPositions = functions.spin(currentPositions, move);
    }
    if (move.type === 'exchange') {
      currentPositions = functions.exchange(currentPositions, move);
    }
    if (move.type === 'partner') {
      currentPositions = functions.partner(currentPositions, move, functions.exchange);
    }
  }
  return currentPositions;
};

export const day16Part1Factory = (input: string, positions = 'abcdefghijklmnop') => {
  const moves = getDanceMoves(input);
  const functions = {
    spin: performSpin,
    partner: performPartner,
    exchange: performExchange
  };
  return performDance(positions, moves, functions);
};