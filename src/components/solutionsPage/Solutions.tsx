import * as React from 'react';
import {match as IMatch, Route } from 'react-router';
import { Solution } from './content/Solution';
import { DayLinks } from './navigationBar/DayLinks';
import { AnswerManager } from '../../answers/AnswerManager';

const answerManager = new AnswerManager();
const solutionsData = answerManager.getSolutionsData();

const Solutions = ({ match }: { match: IMatch<{}> }) => {
    return (
        <div>
            <h2>Solutions</h2>
            <div className="navBar">
                <DayLinks currentUrl={match.url} solutionData={solutionsData}/>
            </div>

            <Route path={`${match.url}/:day`} component={Solution}/>
            <Route
                exact={true}
                path={match.url}
                render={() => (
                    <h3>Please select a day.</h3>
                )}
            />
        </div>
    );
};

export { Solutions };