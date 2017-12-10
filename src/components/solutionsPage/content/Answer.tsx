import * as React from 'react';

interface Props {
    solutionPart: number;
    answer: string;
}

export const Answer = (props: Props): JSX.Element => {
    return (
        <div>
            <p><strong>Solution {props.solutionPart}:</strong> {props.answer}</p>
        </div>
    );
};
