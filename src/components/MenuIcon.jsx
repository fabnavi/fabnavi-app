import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { remote } from 'electron';
import { push } from 'react-router-redux';

import { signInFailed, signedIn, signedOut, signingOut } from '../actions/users';

const debug = Debug('fabnavi:jsx:MenuIcon');

const MenuIcon = (props) => {
    const signIn = () => {
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
                props.signedIn({
                    'Access-Token': url.match(/auth_token=([a-zA-Z0-9\-_]*)/)[1],
                    'Uid': url.match(/uid=([a-zA-Z0-9\-_]*)/)[1],
                    'Client': url.match(/client_id=([a-zA-Z0-9\-_]*)/)[1]
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
                signIn();
            } else {
                props.signingOut();
                api.signOut()
                    .then(res => {
                        debug(res);
                        props.signedOut();
                    });
            }
        }
    };
    return (
        <div>
            <style jsx>{`
                img {
                    width: 50px;
                    height: 50px;
                    margin: 10px 0 0 0;
                }
                img:hover{
                    cursor : pointer;
                    border:1px dashed black;
                }
            `}</style>
            <a onClick={_onClick} >
                <img src={props.src} />
            </a>
        </div>
    );
}

MenuIcon.propTypes = {
    jump: PropTypes.func,
    signedIn: PropTypes.func,
    signedOut: PropTypes.func,
    signingOut: PropTypes.func,
    src: PropTypes.string,
    to: PropTypes.string,
    act: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => (
    {
        jump: (path) => {
            // TODO: store.dispatch(fetchProjects(0, 'all'))のactionを飛ばす
            // 飛ばすのはいいけど，middlware/epicにはデータを格納するだけで `/` に戻る処理がない
            // `/` に戻る処理と全プロジェクトを取る，というactionを作る
            dispatch(push(path));
        },
        signedIn: (credential) => {
            api.saveCredential(credential);
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
            dispatch(signInFailed({
                message: 'sign in failed. see console',
                error,
                info,
                time: now.toTimeString()
            }));
        }
    }
);

export default connect(null, mapDispatchToProps)(MenuIcon);
