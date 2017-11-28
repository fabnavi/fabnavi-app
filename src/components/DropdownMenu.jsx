import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { connect } from 'react-redux';
import '../stylesheets/application/right_menu.scss';
import { remote } from 'electron';
import { push } from 'react-router-redux';

import { signInFailed, signedIn, signedOut, signingOut } from '../actions/users';

const debug = Debug('fabnavi:jsx:DropdownMenu');

class DropdownMenu extends React.Component {
    constructor (props) {
        super(props);

        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    handleLinkClick () {
        this.refs.dropdown.hide();
    }

    render () {
    // const { user } = this.props;
        const user = {
            name: 'satoshi',
        }

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
        };

        const _onClickSignIn = () => {
            signIn();
        };

        const _onClickSignOut = () => {
            this.props.signingOut();
            api.signOut()
                .then(res => {
                    debug(res);
                    this.props.signedOut();
                });
        }

        return this.props.isLoggedIn ? (
            <Dropdown className="account-dropdown" ref="dropdown">
                <DropdownTrigger>
                  Signed in as <strong>{user.name}</strong>
                </DropdownTrigger>
                <DropdownContent>
                    <ul className="account-dropdown__management-links account-dropdown__segment">
                        <li className="account-dropdown__link">
                            <a className="account-dropdown__link__anchor" href="#" onClick={_onClickSignOut}>
                                Sign out
                            </a>
                        </li>
                    </ul>
                </DropdownContent>
            </Dropdown>
        ) : (
            <a className="account-dropdown__link__anchor" href="#" onClick={_onClickSignIn}>Sign In</a>
        );
    }
}

DropdownMenu.propTypes = {
    user: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    jump: PropTypes.func,
    signedIn: PropTypes.func,
    signedOut: PropTypes.func,
    signingOut: PropTypes.func
};

const mapStateToProps = (state) => (
    {
        isLoggedIn: state.user.isLoggedIn
    }
);


const mapDispatchToProps = (dispatch) => (
    {
        jump: (path) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);
