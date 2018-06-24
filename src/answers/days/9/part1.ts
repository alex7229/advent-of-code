interface CleanUpGarbage {
  (input: string): string;
}

interface CalculateGroupsScore {
  (input: string, cleanUpGarbage: CleanUpGarbage): number;
}

export const cleanUpGarbage: CleanUpGarbage = (input) => {
  let isGarbage = false;
  let exclamationActive = false;
  let cleanString = '';
  for (const char of input) {
    if (!isGarbage) {
       if (char === '<') {
         isGarbage = true;
         continue;
       }
       cleanString += char;
       continue;
    }
    if (exclamationActive) {
      exclamationActive = false;
      continue;
    }
    if (char === '!') {
      exclamationActive = true;
      continue;
    }
    if (char === '>') {
      isGarbage = false;
    }
  }
  return cleanString;
};

export const calculateGroupsScore: CalculateGroupsScore = (input, cleanUpGarbageFunc) => {
  const cleanInput = cleanUpGarbageFunc(input);
  let indentationLevel = 0;
  let score = 0;
  for (const char of cleanInput) {
    if (char === '{') {
      indentationLevel++;
      continue;
    }
    if (char === '}') {
      score += indentationLevel;
      indentationLevel--;
    }
  }
  return score;
};

export const day9Part1Factory = (input: string) => calculateGroupsScore(input, cleanUpGarbage);