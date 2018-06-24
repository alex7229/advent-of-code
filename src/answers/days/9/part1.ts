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
  const withoutExceptions = input.replace( /!./g, '');
  const garbageRegExp = /<[^>]*>/g;
  let match;
  let score = 0;
  while ((match = garbageRegExp.exec(withoutExceptions)) !== null) {
    score += match[0].length - 2;
  }
  const cleanInput = withoutExceptions.replace(garbageRegExp, '');
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