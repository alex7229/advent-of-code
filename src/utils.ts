export interface FindArraySum {
  (input: number[]): number;
}

export interface SplitByRows {
  (input: string): string[];
}

export const findArraySum: FindArraySum = (input) => {
  return input.reduce((total, current) => {
    return total + current;
  });
};

export const splitByRows: SplitByRows = (input) => {
  let rows = input.split('\n');
  if (rows[rows.length - 1] === '') {
    rows.pop();
  }
  return rows;
};