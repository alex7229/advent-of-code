import { SolutionPart } from '../components/solutionsPage/content/Solution';

enum IsSolved {
    notSolved,
    onePartSolved,
    bothPartsSolved
}

interface SolutionData {
    day: number;
    isSolved: IsSolved;
}

// todo: solution answers should be managed here
// todo: finish first task,
// todo: redo button color for first task (finished)
const getDefaultAnswer = (solutionNumber: string, solutionPart: SolutionPart) => {
    return `There is no solution for day ${solutionNumber}, part ${solutionPart}`;
};

const getAnswer = (day: string, part: SolutionPart, input: string): string => {
    return getDefaultAnswer(day, part);
};

const getSolutionsData = (): SolutionData[]  => {
    // without .fill(0) array doesn't initialise properly
    return Array(25).fill(0).map((data, index): SolutionData => {
        return {
            day: index + 1,
            isSolved: IsSolved.notSolved
        };
    });
};

export { getAnswer, getSolutionsData, IsSolved, SolutionData };