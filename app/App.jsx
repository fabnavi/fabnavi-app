import React, {Component, PropTypes, createElement} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './components/Home.jsx'
import Player from './components/Player.jsx';
import Detail from './components/Detail.jsx';



export default class App extends Component {
    render(){
        return (
            <Router>
                <div>
                <ul>
                    <li><Link to="/"> Home </Link></li>
                    <li><Link to="/detail"> Detail </Link></li>
                    <li><Link to="/player"> Player </Link></li>
                </ul>

                <hr />

                <Route exact path="/" component={Home}/>
                <Route path="/detail" component={Detail}/>
                <Route path="/player" component={Player}/>
                </div>
            </Router>
        ) 
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);