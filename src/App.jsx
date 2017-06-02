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

import ProjectList from './components/ProjectList.jsx';
import ProjectManager from './components/ProjectManager.jsx';
import Player from './components/Player.jsx';
import CreateProject from './components/CreateProject.jsx';
import EditProject from './components/EditProject';
import ProjectDetail from './components/ProjectDetail.jsx';

import reducer from './reducers/index';
import adjustor from './middleware/adjustor';
import rootEpics from './middleware/epics/index';
import {handleKeyDown} from './actions/KeyActionCreator';
import WebAPIUtils from './Utils/WebAPIUtils';
import {changeFrame} from './actions/frame';



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
