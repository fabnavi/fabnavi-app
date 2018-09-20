import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { remote } from 'electron';
import { push } from 'react-router-redux';

import { host } from '../utils/host';
import api from '../utils/WebAPIUtils';

import { signInFailed, signedIn, signedOut, signingOut } from '../actions/users';

import { IconStyle, LinkStyle, LogoStyle, NewLogoStyle } from '../stylesheets/application/ProjectIndex/StyledMenuIcon';
import { Button } from '../stylesheets/application/interface/StyledButton';
import { changeProjectListPage } from '../actions/manager';

const debug = Debug('fabnavi:jsx:MenuIcon');

// TODO: split class
export const MenuIcon = props => {
    const signIn = () => {
        debug('sign in process is starting');
        const authUrl = `${host.url}/auth/github?auth_origin_url=${host.url}`;
        const authWindow = new remote.BrowserWindow({
            modal: true,
            width: 400,
            height: 800,
            webPreferences: {
                webSecurity: false
            }
        });
        authWindow.loadURL(authUrl);
        const onMessage = () => {
            debug(authWindow.getURL());
            const url = authWindow.getURL();
            if(url.includes('uid') && url.includes('client_id') && url.includes('auth_token')) {
                props.signedIn({
                    'Access-Token': url.match(/auth_token=([a-zA-Z0-9\-_]*)/)[1],
                    Uid: url.match(/uid=([a-zA-Z0-9\-_]*)/)[1],
                    Client: url.match(/client_id=([a-zA-Z0-9\-_]*)/)[1]
                });
                authWindow.close();
            }
        };
        authWindow.once('message', onMessage);
        authWindow.on('page-title-updated', onMessage);
    };

    const _onClick = () => {
        if(props.hasOwnProperty('to')) {
            if(props.to === '/' && props.currentPage !== 0) {
                props.jumpToHome();
            }
            props.jump(props.to);
        }
        if(props.hasOwnProperty('act')) {
            if(props.act === 'sign_in') {
                debug('sign in action');
                signIn();
            } else {
                props.signingOut();
                api.signOut()
                    .then(res => {
                        debug('response is: ', res);
                        props.signedOut();
                    })
                    .catch(err => debug('error is occuered: ', err));
            }
        }
    };
    return (
        <div>
            <a onClick={_onClick}>
                {props.act === 'sign_in' ? (
                    <Button>Sign In</Button>
                ) : props.act === 'sign_out' ? (
                    <Button>Sign Out</Button>
                ) : props.help === true ? (
                    <IconStyle help src={props.src} />
                ) : props.logo === true ? (
                    <NewLogoStyle type="logo" src={props.src} />
                ) : (
                    <LogoStyle src={props.src} />
                )}
            </a>
        </div>
    );
};

MenuIcon.propTypes = {
    jump: PropTypes.func,
    signedIn: PropTypes.func,
    signedOut: PropTypes.func,
    signingOut: PropTypes.func,
    src: PropTypes.string,
    to: PropTypes.string,
    act: PropTypes.string,
    currentPage: PropTypes.number,
    jumpToHome: PropTypes.func
};

export const mapStateToProps = state => ({
    currentPage: state.manager.currentPage
});

export const mapDispatchToProps = dispatch => ({
    jumpToHome: () => {
        dispatch(changeProjectListPage(0));
    },
    jump: path => {
        dispatch(push(path));
    },
    signedIn: credential => {
        debug('credential: ', credential);
        api.saveCredential(credential);
        api.prepareHeaders();
        dispatch(signedIn(credential));
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
        dispatch(
            signInFailed({
                message: 'sign in failed. see console',
                error,
                info,
                time: now.toTimeString()
            })
        );
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuIcon);
