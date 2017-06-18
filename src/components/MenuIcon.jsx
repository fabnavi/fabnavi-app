import React from 'react';
import { connect } from 'react-redux';
import Debug from 'debug';
import { browserHistory } from 'react-router';

import { signInFailed, signedIn, signedOut, signingOut } from '../actions/users';

const debug = Debug('fabnavi:jsx:MenuIcon');
const { remote } = require('electron');

class MenuIcon extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = () => {
            if(this.props.hasOwnProperty('to')) {
                browserHistory.push(this.props.to);
            }
            if(this.props.hasOwnProperty('act')) {
                if(this.props.act === 'sign_in') {
                    this.signIn();
                } else {
                    this.signOut();
                }
            }
        };

        this.signIn = () => {
            const host = 'http://preview.fabnavi.org/';
            const url = `${host}/auth/github?auth_origin_url=${host}`;
            const authWindow = new remote.BrowserWindow({
                modal: true,
                width: 400,
                height: 800,
                webPreferences: {
                    webSecurity: false,
                }
            });
            authWindow.loadURL(url);
            const onMessage = (e) => {
                debug(authWindow.getURL());
                const url = authWindow.getURL();
                if(url.includes('uid') && url.includes('client_id') && url.includes('auth_token')){
                    console.log('action');
                    this.props.signedIn({
                    'Access-Token': url.match(/auth_token=([a-zA-Z0-9\-\_]*)/)[1],
                    'Uid': url.match(/uid=([a-zA-Z0-9\-\_]*)/)[1],
                    'Client': url.match(/client_id=([a-zA-Z0-9\-\_]*)/)[1]
                });
                authWindow.close();
            }
            authWindow.once('message', onMessage);
            authWindow.on('page-title-updated', onMessage);
            };
        }

        this.signOut = () => {
            this.props.signingOut();
            api.signOut()
            .then(res => {
                debug(res);
                this.props.signedOut();
            }
          );
        };
    }

    render() {
        return (
          <a className="menu-action nav-action"
            onClick={this.onClick} >
            <img src={this.props.src} />
          </a>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        signedIn: (credential) => {
            api.saveCredential(credential);
            dispatch(signedIn(credential));
        },
        signingIn: () => {
          // TODO: (implement) signingInくるくる
        },
        signingOut: () => {
            dispatch(signingOut());
        },
        signedOut: () => {
            api.clearCredential();
            api.clearUserId();
            dispatch(signedOut());
        },
        signInFailed: (error, info) => {
            const now = new Date();
            dispatch(signInFailed({
                message: 'sign in failed. see console',
                error,
                info,
                time: now.toTimeString()
            }));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuIcon);
