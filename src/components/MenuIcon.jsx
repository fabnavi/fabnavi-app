import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { remote } from 'electron';
import { push } from 'react-router-redux';

import { signInFailed, signedIn, signedOut, signingOut } from '../actions/users';

const debug = Debug('fabnavi:jsx:MenuIcon');

class MenuIcon extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = () => {
            if(this.props.hasOwnProperty('to')) {
                this.props.jump(this.props.to);
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
                    this.props.signedIn({
                        'Access-Token': url.match(/auth_token=([a-zA-Z0-9\-_]*)/)[1],
                        'Uid': url.match(/uid=([a-zA-Z0-9\-_]*)/)[1],
                        'Client': url.match(/client_id=([a-zA-Z0-9\-_]*)/)[1]
                    });
                    authWindow.close();
                }
            };
            authWindow.once('message', onMessage);
            authWindow.on('page-title-updated', onMessage);
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
            <div>
                <style jsx>{`
                    img {
                        width: 65%;
                        height: 65%;
                        margin: 0px;
                        width: 50px;
                        height: 50px;
                        margin: 0px;
                        margin-top: 10px;
                    }
                `}</style>
                <a onClick={this.onClick} >
                    <img src={this.props.src} />
                </a>
            </div>
        );
    }
}

MenuIcon.propTypes = {
    jump: PropTypes.func,
    signedIn: PropTypes.func,
    signingIn: PropTypes.func,
    signedOut: PropTypes.func,
    signingOut: PropTypes.func,
    src: PropTypes.string,
    to: PropTypes.string,
    act: PropTypes.string,
};

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        jump: (path) => {
            dispatch(push(path));
        },
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
