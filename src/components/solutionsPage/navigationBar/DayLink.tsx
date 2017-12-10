import * as React from 'react';
import { IsSolved } from '../../../answers/getAnswer';
import { Link } from 'react-router-dom';

interface Props {
    day: number;
    isSolved: IsSolved;
    url: string;
}

const getColor = (isSolved: IsSolved): string => {
    let buttonColor: string = 'red';
    if (isSolved === IsSolved.bothPartsSolved)  {
        buttonColor = 'blue';
    } else if (isSolved === IsSolved.onePartSolved) {
        buttonColor = 'yellow';
    }
    return buttonColor;
};

const DayLink = (props: Props): JSX.Element => {
    return (
        <div key={props.day}>
            <Link
                className={`button active ${getColor(props.isSolved)}`}
                to={`${props.url}/${props.day}`}
            >Day {props.day}
            </Link>
        </div>
    );
};

export { DayLink };