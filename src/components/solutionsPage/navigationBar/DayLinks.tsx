import * as React from 'react';
import { SolutionData } from '../../../answers/AnswerManager';
import { DayLink } from './DayLink';

interface Props {
    currentUrl: string;
    solutionData: SolutionData[];
}

const DayLinks = (props: Props): JSX.Element => {
    return (
        <div>
            {props.solutionData.map(({day, isSolved}) => (
                <DayLink key={day} day={day} isSolved={isSolved} url={props.currentUrl}/>
            ))}
        </div>
    );
};

export { DayLinks };
