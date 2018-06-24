interface CleanUpGarbage {
  (input: string): {
    cleanInput: string;
    score: number
  };
}

interface CalculateGroupsScore {
  (input: string, cleanUpGarbage: CleanUpGarbage): number;
}

export const cleanUpGarbage: CleanUpGarbage = (input) => {
  let isGarbage = false;
  let exclamationActive = false;
  let cleanInput = '';
  let score = 0;
  for (const char of input) {
    if (!isGarbage) {
       if (char === '<') {
         isGarbage = true;
         continue;
       }
       cleanInput += char;
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
      continue;
    }
    score++;
  }
  return { cleanInput, score };
};

export const calculateGroupsScore: CalculateGroupsScore = (input, cleanUpGarbageFunc) => {
  const cleanInput = cleanUpGarbageFunc(input).cleanInput;
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