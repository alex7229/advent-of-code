export interface FindArraySum {
  (input: number[]): number;
}

export const findArraySum: FindArraySum = (input) => {
  return input.reduce((total, current) => {
    return total + current;
  });
};