import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { Home } from './components/Home';
import { About } from './components/About';
import { Solutions } from './components/solutionsPage/Solutions';

// todo: restyle header links
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