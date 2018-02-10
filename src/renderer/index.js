import React from 'react';
import ReactDOM from 'react-dom';
import 'rxjs';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Debug from 'debug';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createMemoryHistory from 'history/createMemoryHistory';
import { remote } from 'electron';

import ProjectList from './components/ProjectList';
import ProjectManager from './components/ProjectManager';
import Player from './components/Player';
import CreateProject from './components/CreateProject';
import ProjectEditForm from './components/ProjectEditForm';
import ProjectDetail from './components/ProjectDetail';
import Help from './components/HelpPage';
import WorkSpace from './components/WorkSpace';

import reducers from './reducers/index';
import adjustor from './middleware/epics/adjustor';
import epicsMiddleware from './middleware/epics/index';
import { handleKeyDown } from './actions/KeyActionCreator';
import { signedIn } from './actions/users';
import WebAPIUtils from './utils/WebAPIUtils';

import './stylesheets/application/help_page.scss';
import './stylesheets/player/player.scss';

import isDev from 'electron-is-dev';
import { fetchProjects } from './actions/manager';
const debug = Debug('fabnavi:jsx:FabnaviApp');

const forceSignIn = (store) => {
    debug('force login')
    const host = 'http://fabnavi.org/';
    const authUrl = `${host}/auth/github?auth_origin_url=${host}`;
    const authWindow = new remote.BrowserWindow({
        modal: true,
        width: 400,
        height: 800,
        webPreferences: {
            webSecurity: false,
        }
    });
    authWindow.loadURL(authUrl);
    const onMessage = () => {
        debug(authWindow.getURL());
        const url = authWindow.getURL();
        if(url.includes('uid') && url.includes('client_id') && url.includes('auth_token')) {
            const credential = {
                'Access-Token': url.match(/auth_token=([a-zA-Z0-9\-_]*)/)[1],
                'Uid': url.match(/uid=([a-zA-Z0-9\-_]*)/)[1],
                'Client': url.match(/client_id=([a-zA-Z0-9\-_]*)/)[1]
            };
            api.saveCredential(credential);
            store.dispatch(signedIn(credential));
            authWindow.close();
        }
    };
    authWindow.once('message', onMessage);
    authWindow.on('page-title-updated', onMessage);
}
if(isDev) {
    window.api = WebAPIUtils;
    window.assetsPath = '';
} else {
    window.assetsPath = __static;
}
window.addEventListener('DOMContentLoaded', () => {
    debug('======> Mount App');
    const history = createMemoryHistory();
    const composeEnhancers = isDev ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
    const store = createStore(reducers,
        composeEnhancers(applyMiddleware(
            adjustor,
            epicsMiddleware,
            routerMiddleware(history))));
    api.init(store);
    debug(api.loadCredential())
    if(!api.loadCredential()) forceSignIn(store);
    store.dispatch(fetchProjects(0, 'all'));
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route component={Player} path="/play/:projectId" />
                    <Route component={WorkSpace} path="/workspace"/>
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
