import React from 'react';
import ReactDOM from 'react-dom';
import 'rxjs';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Debug from 'debug';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createMemoryHistory from 'history/createMemoryHistory';

import ProjectList from './ProjectList';
import ProjectManager from './ProjectManager';
import Player from './Player';
import CreateProject from './CreateProject';
import ProjectEditForm from './ProjectEditForm';
import ProjectDetail from './ProjectDetail';
import Help from './HelpPage';

import reducers from '../reducers/index';
import adjustor from '../middleware/adjustor';
import epicsMiddleware from '../middleware/epics/index';
import { handleKeyDown } from '../actions/KeyActionCreator';
import WebAPIUtils from '../utils/WebAPIUtils';

import '../stylesheets/application/application.scss';
import '../stylesheets/player/player.scss';
import '../stylesheets/project_list/projects.scss';
import '../stylesheets/project_list/detail.scss';
import '../stylesheets/project_list/edit_page.scss';
import '../stylesheets/project_list/form.scss';

const debug = Debug('fabnavi:jsx:FabnaviApp');

window.api = WebAPIUtils;
window.addEventListener('DOMContentLoaded', () => {
    debug('======> Mount App');
    const history = createMemoryHistory();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducers,
        composeEnhancers(applyMiddleware(
            adjustor,
            epicsMiddleware,
            routerMiddleware(history))));
    api.init(store);
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route component={Player} path="/play/:projectId" />
                    <Route path="/" render={() =>
                        <ProjectManager >
                            <Switch>
                                <Route component={ProjectList} path="/" exact />
                                <Route component={ProjectList} path="/myprojects"/>
                                <Route component={Help} path="/help"/>
                                <Route component={CreateProject} path="/create"/>
                                <Route component={ProjectEditForm} path="/edit/:projectId"/>
                                <Route component={ProjectDetail} path="/detail/:projectId"/>
                            </Switch>
                        </ProjectManager>
                    } />
                </Switch>
            </ConnectedRouter>
        </Provider>, document.getElementById('app'));
    window.addEventListener('keydown', handleKeyDown(store));
}
);