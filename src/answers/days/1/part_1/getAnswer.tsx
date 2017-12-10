const parseInput = (input: string): string => {
    return input + ' parsed now!';
};

const getAnswer = (input: string): string => {
    const parsedInput = parseInput(input);
    return `answer is ${parsedInput}.Finally`;
};

export { getAnswer };