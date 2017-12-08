import { SolutionPart } from '../../Solution';

const getAnswer = (solution: SolutionPart, input: string): string => {
    return `solutionPart ${solution} with input ${input}`;
};

export { getAnswer };