import React from 'react';
import ReactDOM from 'react-dom';
import 'rxjs';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Debug from 'debug';
import { Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { createMemoryHistory } from 'history';

import ProjectList from './ProjectList';
import ProjectManager from './ProjectManager';
import Player from './Player';
import CreateProject from './CreateProject';
import EditProject from './EditProject';
import ProjectDetail from './ProjectDetail';

import reducers from '../reducers/index';
import adjustor from '../middleware/adjustor';
import rootEpics from '../middleware/epics/index';
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
    let history = createMemoryHistory();
    const middleware = routerMiddleware(history);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducers, composeEnhancers(applyMiddleware(middleware)));
    history = syncHistoryWithStore(history, store);

    window.store = store;

    api.init(store);
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Route components={ProjectManager} path="/" >
                    <IndexRoute component={ProjectList}/>
                    <Route component={ProjectList} path="myprojects"/>
                    <Route component={CreateProject} path="create"/>
                    <Route component={EditProject} path="edit/:projectId"/>
                    <Route component={ProjectDetail} path="detail/:projectId"/>
                </Route>
                <Route components={Player} path="/play/:projectId" />
            </Router>
        </Provider>, document.getElementById('app'));
    window.addEventListener('keydown', handleKeyDown(store));
}
);

function isAuthWindow(url) {
    return url.includes('uid') && url.includes('client_id') && url.includes('auth_token');
}

function parseAuthInfo(url) {
    return {
        'Access-Token': url.match(/auth_token=([a-zA-Z0-9\-\_]*)/)[1],
        'Uid': url.match(/uid=([a-zA-Z0-9\-\_]*)/)[1],
        'Client': url.match(/client_id=([a-zA-Z0-9\-\_]*)/)[1]
    };
}