import { getGrid, hexToBin } from './part1';
import { day10Part2Factory as knotHash } from '../10/part2';

interface FindGroups {
  (grid: string[]): string[][];
}

export const findGroups: FindGroups = grid => {
  let groups: string[][] = [];
  for (let rowNumber = 0; rowNumber < grid.length; rowNumber ++) {
    for (let columnNumber = 0; columnNumber < grid[rowNumber].length; columnNumber ++) {
      const cell = grid[rowNumber][columnNumber];
      if (cell === '0') {
        continue;
      }
      const cellId = `${rowNumber}-${columnNumber}`;
      let cellGroup = groups.find(group => group.includes(cellId));
      let otherGroups = groups.filter(group => !group.includes(cellId));
      if (cellGroup === undefined) {
        cellGroup = [cellId];
      }
      const bottomCell = grid[rowNumber + 1] && grid[rowNumber + 1][columnNumber];
      if (bottomCell === '1') {
        cellGroup.push(`${rowNumber + 1}-${columnNumber}`);
      }
      const rightCell = grid[rowNumber][columnNumber + 1];
      if (rightCell === '1') {
        // There is a possibility that right cell is already in some other group
        // if it is -> move that whole group in the current cell group and remove all items (make an empty array)
        // there is also a possibility that right cell in the same group as the main cell
        const rightCellId = `${rowNumber}-${columnNumber + 1}`;
        let rightCellGroup = groups.find(group => group.includes(rightCellId));
        if (rightCellGroup === undefined) {
          cellGroup.push(rightCellId);
          otherGroups.push(cellGroup);
          groups = otherGroups;
          continue;
        }
        // possible duplication problem
        // if right cell is already in the main cell group -> don't change anything
        if (!cellGroup.includes(rightCellId)) {
          cellGroup = [...cellGroup, ...rightCellGroup];
          otherGroups = otherGroups.filter(group => !group.includes(rightCellId));
        }
      }
      otherGroups.push(cellGroup);
      groups = otherGroups;
    }
  }
  return groups;
};

export const day14Part2Factory = (input: string) => {
  const grid = getGrid(input, knotHash, hexToBin);
  return findGroups(grid).length;
};