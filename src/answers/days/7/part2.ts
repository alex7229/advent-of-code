import { findRootTower, FindRootTower, getInformation, Information, parseLine } from './part1';
import { splitByRows } from '../../../utils';

interface Weight {
  itself: number;
  holds: number;
  total: number;
}

interface FindWeight {
  (name: string, information: Information): Weight;
}

interface GetBalancedWeight {
  (
    information: Information,
    findRootTower: FindRootTower,
    findWeight: FindWeight,
    currentTowerName?: string
  ): number;
}

export const findWeight: FindWeight = (name, information) => {
  if (!information[name]) {
    throw new Error('cannot find weight for that name:' + name);
  }
  const itself = information[name].weight;
  const holds = information[name].holds
    .map((holdTower) => findWeight(holdTower, information))
    .reduce((total, towerWeight) => total + towerWeight.total, 0);
  return {
    itself,
    holds,
    total: itself + holds
  };
};

export const getBalancedWeight: GetBalancedWeight = (
  information,
  findRootTowerFunc,
  findWeightFunc,
  currentTowerName
) => {
  const name = currentTowerName  === undefined ? findRootTowerFunc(information) : currentTowerName;
  const tower = information[name];
  if (tower.holds.length === 0) {
    // empty tower. It is correct by default
    return 0;
  }
  if (tower.holds.length === 1) {
    // tower contains only one sub-tower. This is balanced, too.
    return getBalancedWeight(information, findRootTowerFunc, findWeightFunc, tower.holds[0]);
  }
  if (tower.holds.length === 2) {
    // tower contains two sub-towers. Even if numbers were different -> which one would be correct?
    // assumption -> they should be the same, otherwise it would not be solvable
    const firstImbalance = getBalancedWeight(information, findRootTowerFunc, findWeight, tower.holds[0]);
    const secondImbalance = getBalancedWeight(information, findRootTowerFunc, findWeight, tower.holds[1]);
    return firstImbalance + secondImbalance;
  }
  // tower contains three or more sub-towers
  // assumption -> only one is incorrect
  const weights = tower.holds.map(towerName => findWeightFunc(towerName, information));
  let correctTotalWeight: number;
  if (weights[0].total !== weights[1].total && weights[0].total !== weights[2].total) {
    // if first tower does't equal two any other towers (two comparisons are enough) -> it's incorrect
    correctTotalWeight = weights[1].total;
  } else {
    // otherwise it's correct
    correctTotalWeight = weights[0].total;
  }
  if (weights.every(weight => weight.total === correctTotalWeight)) {
    // all towers are balanced. Imbalance is somewhere deeper
    return tower.holds
      .map(innerTowerName =>
        getBalancedWeight(information, findRootTowerFunc, findWeightFunc, innerTowerName)
      )
      .reduce((totalImbalance, currentImbalance) => totalImbalance + currentImbalance);
  }
  for (let i = 0; i < tower.holds.length; i++) {
    const towerName = tower.holds[i];
    const towerWeight = weights[i];
    if (towerWeight.total === correctTotalWeight) {
      continue;
    }
    // here is check if there is deeper imbalance. If none - only this block is unbalanced
    const deeperImbalance = getBalancedWeight(information, findRootTowerFunc, findWeightFunc, towerName);
    if (deeperImbalance !== 0) {
      return deeperImbalance;
    }
    return Math.abs(correctTotalWeight - towerWeight.holds);
  }
  throw new Error('should not throw here. Something is wrong');
};

export const day7Part2Factory = (input: string) => {
  const info = getInformation(input, parseLine, splitByRows);
  return getBalancedWeight(info, findRootTower, findWeight);
};