import * as React from 'react';
import { getAnswer } from '../../../answers/getAnswer';
import { match as IMatch } from 'react-router-dom';
import { Answer } from './Answer';

enum SolutionPart {
    first = 1,
    second = 2
}

interface Props {
    match: IMatch<{day: string}>;
}

export class Solution extends React.Component<Props, object> {

    constructor(props: Props) {
        super(props);
        this.state = {
            [SolutionPart.first]: {
                input: '',
                answer: ''
            },
            [SolutionPart.second]: {
                input: '',
                answer: ''
            }
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>, textAreaNumber: SolutionPart): void {
        const currentDay = this.props.match.params.day;
        const input = event.target.value;
        const answer = getAnswer(currentDay, textAreaNumber, input);
        this.setState({
            [textAreaNumber]: { input, answer }
        });
    }

    render() {
        return (
            <div>
                <Answer solutionPart={SolutionPart.first} answer={this.state[SolutionPart.first].answer}/>
                <Answer solutionPart={SolutionPart.second} answer={this.state[SolutionPart.second].answer}/>
                <textarea onChange={event => this.handleOnChange(event, SolutionPart.first)} />
                <textarea onChange={event => this.handleOnChange(event, SolutionPart.second)} />
            </div>
        );
    }
}

export { SolutionPart };