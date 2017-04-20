import React, {Component, PropTypes, createElement} from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  Link
} from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { createMemoryHistory } from 'history';

import Home from './components/Home.jsx'
import Player from './components/Player.jsx';
import Detail from './components/Detail.jsx';
import BackButton from './components/BackButton.jsx';

import { createAction } from "redux-actions";

import reducers from './reducers';

const history = createMemoryHistory();
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

window.push = push;
window.store = store;

export default class App extends Component {
  render(){
    return (
      <Provider store={store}> 
        <Router history={history}>
          <div>
            <ul>
              <li><Link to="/"> Home </Link></li>
              <li><Link to="/detail"> Detail </Link></li>
              <li><Link to="/player"> Player </Link></li>
              <li> <BackButton /> </li>
            </ul>

            <hr />

            <Route exact path="/" component={Home}/>
            <Route path="/detail" component={Detail}/>
            <Route path="/player" component={Player}/>
          </div>
        </Router>
      </Provider>
    ); 
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);
