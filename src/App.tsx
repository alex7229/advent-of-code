import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    match as IMatch
} from 'react-router-dom';
import { Solution } from './Solution';

enum SolutionDesc {
    notSolved,
    onePartSolved,
    bothPartsSolved
}

let solutionsData: SolutionDesc[] = Array(25).fill(0);

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

const Solutions = ({ match }: { match: IMatch<{}> }) => {
    const links: JSX.Element[] = solutionsData.map((solutionData: number, index: number) => {
        let buttonColor: string = 'red';
        if (solutionData === SolutionDesc.bothPartsSolved)  {
            buttonColor = 'blue';
        } else if (solutionData === SolutionDesc.onePartSolved) {
            buttonColor = 'yellow';
        }
        return (
            <div key={index + 1}>
                <Link
                    className={`button active ${buttonColor}`}
                    to={`${match.url}/${index + 1}`}
                >Day {index + 1}
                </Link>
            </div>
        );
    });
    return (
        <div>
            <h2>Solutions</h2>
            <div className="navBar">{links}</div>

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

const App = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/solutions">Solutions</Link></li>
            </ul>

            <hr/>

            <Route exact={true} path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/solutions" component={Solutions}/>
        </div>
    </Router>
);

export default App;