
import React from 'react';
import { connect } from 'react-redux';
import Debug from 'debug';
import { browserHistory } from 'react-router';

import { signInFailed, signedIn, signedOut, signingOut } from "../actions/users";

const debug = Debug('fabnavi:jsx:MenuIcon');

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
      const host = window.location.origin;
      const url = `${host}/auth/github?auth_origin_url=${host}`;
      window.open(url);
      const onMessage = (e) => {
        window.removeEventListener("message", onMessage, false);

        if(e.origin === window.location.origin) {
          try{
            debug(">> ", e.data);
            this.props.signedIn(JSON.parse(e.data));
          } catch(error) {
            this.props.signInFailed(error, e);
          }
        }
      };
      window.addEventListener('message', onMessage);
    };

    this.signOut = () => {
      this.props.signingOut();
      api.signOut()
      .then(res => {
        debug(res);
        this.props.signedOut();
      });
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
