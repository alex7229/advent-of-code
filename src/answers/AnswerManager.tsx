import { SolutionPart } from '../components/solutionsPage/content/Solution';
import { getAnswer as getAnswer_1_1 } from './days/1/part_1/getAnswer';
import { getAnswer as getAnswer_1_2 } from './days/1/part_2/getAnswer';
import { getAnswer as getAnswer_2_1 } from './days/2/part_1/getAnswer';
import { getAnswer as getAnswer_2_2 } from './days/2/part_2/getAnswer';

enum IsSolved {
    notSolved,
    onePartSolved,
    bothPartsSolved
}

interface SolutionData {
    day: number;
    isSolved: IsSolved;
}

interface AnswerFunc {
    (input: string): string;
}

interface SolutionAnswer extends SolutionData {
    answers: AnswerFunc[];
}

const getDefaultAnswer = (input: string): string => {
    return `answer for this part is not available. Current input is ${input}`;
};

interface AnswerManagerInterface {
    getAnswer(): string;
    getSolutionsData(): SolutionData[];
}

// todo: finish first task
// This class is pretty ugly. One should use setSolvedAnswers() method to store all answers manually. Import - manual.
// Better way for this to check dynamically if getAnswer module is exist in directory with answers
export class AnswerManager implements AnswerManagerInterface {

    private day: string;
    private solutionNumber: number;
    private solutionsCount: number = 25;
    private solutionPart: SolutionPart;
    private input: string;
    private answersList: SolutionAnswer[];

    constructor(day: string = '1', solutionPart: SolutionPart = SolutionPart.first, input: string = '') {
        this.day = day;
        this.solutionPart = solutionPart;
        this.input = input;
        this.createEmptyAnswersList();
        this.setSolvedAnswers();
        this.setSolutionNumberFromDay();
    }

    public getAnswer(): string {
        if (!Number.isNaN(this.solutionNumber)) {
            const answerFunction: AnswerFunc = this.answersList[this.solutionNumber].answers[this.solutionPart];
            return answerFunction(this.input);
        }
        return `incorrect day ${this.day} was sent`;
    }

    public getSolutionsData(): SolutionData[] {
        // todo: probably better to rename it to 'getSolutionsStatus'
        return this.answersList;
    }

    private createEmptyAnswersList(): void {
        this.answersList =  Array(this.solutionsCount).fill(0).map((data, index): SolutionAnswer => {
            return {
                day: index + 1,
                isSolved: IsSolved.notSolved,
                answers: Array(3).fill(getDefaultAnswer)
            };
        });
    }

    private setSolvedAnswers(): void {
        // day 1 solution is stored in 0 element of array
        this.setAnswer(0, SolutionPart.first, getAnswer_1_1);
        this.setAnswer(0, SolutionPart.second, getAnswer_1_2);
        this.setAnswer(1, SolutionPart.first, getAnswer_2_1);
        this.setAnswer(1, SolutionPart.second, getAnswer_2_2);

        this.setSolvedStatus();
    }

    private setAnswer(solutionNumber: number, solutionPart: SolutionPart, func: AnswerFunc): void {
        let solution = this.answersList[solutionNumber];
        solution.answers[solutionPart] = func;
    }

    private setSolvedStatus(): void {
        this.answersList = this.answersList.map(({isSolved, answers, day}) => {
            const answer: SolutionAnswer = {
                isSolved,
                answers,
                day
            };
            const firstAnswerFunc: AnswerFunc = answers[SolutionPart.first];
            const secondAnswerFunc: AnswerFunc = answers[SolutionPart.second];
            const defaultAnswerFunc: AnswerFunc = getDefaultAnswer;
            if (firstAnswerFunc === defaultAnswerFunc && secondAnswerFunc === defaultAnswerFunc) {
                // both answers are default - task is not solved
                answer.isSolved = IsSolved.notSolved;
            } else if (firstAnswerFunc !== defaultAnswerFunc && secondAnswerFunc !== defaultAnswerFunc) {
                // both have custom function = they are solved
                answer.isSolved = IsSolved.bothPartsSolved;
            } else {
                // first or second part is solved
                answer.isSolved = IsSolved.onePartSolved;
            }
            return answer;
        });
    }

    private setSolutionNumberFromDay(): void {
        const dayNumber: number = parseInt(this.day, 10);
        if (dayNumber >= 1 && dayNumber <= 25) {
            this.solutionNumber = dayNumber - 1;
        }
    }
}

export { IsSolved, SolutionData };