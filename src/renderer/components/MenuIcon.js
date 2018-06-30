import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { remote } from 'electron';
import { push } from 'react-router-redux';

import { host } from '../utils/host';

import {
    signInFailed,
    signedIn,
    signedOut,
    signingOut
} from '../actions/users';

const debug = Debug('fabnavi:jsx:MenuIcon');

const MenuIcon = props => {
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
            if(
                url.includes('uid') &&
                url.includes('client_id') &&
                url.includes('auth_token')
            ) {
                props.signedIn({
                    'Access-Token': url.match(
                        /auth_token=([a-zA-Z0-9\-_]*)/
                    )[1],
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
            <style jsx>{`
                img {
                    width: 55px;
                    height: 55px;
                    margin: 0;
                    border-radius: 50%;
                    margin-right: 20px;
                    margin-top: -13px;
                }
                img:hover {
                    cursor: pointer;
                    border: 1px dashed black;
                }
                a {
                    margin: 0px;
                    margin-right: 20px;
                    margin-bottom: 140px;
                }
                a:hover {
                    color: #3ba3fe;
                }
            `}</style>
            <a onClick={_onClick}>
                {props.act === 'sign_in' ? (
                    <a>Sign In</a>
                ) : props.act === 'sign_out' ? (
                    <a>Sign Out</a>
                ) : (
                    <img src={props.src} />
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
    act: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
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
    null,
    mapDispatchToProps
)(MenuIcon);
