import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';

import { host } from '../utils/host';
import api from '../utils/WebAPIUtils';

import { reloadProjects } from '../actions/manager';
import { signedOut, signingOut } from '../actions/users';

const debug = Debug('fabnavi:jsx:HostSelector');

export class HostSelector extends Component {
    constructor(props) {
        super(props);
        this.handleHostChanged = this.handleHostChanged.bind(this)
    }

    handleHostChanged(event) {
        host.set(event.target.value);
        if(this.props.isLoggedIn) {
            api.signOut()
                .then(res => {
                    debug('response is: ', res);
                    this.props.signedOut()
                })
                .then(() => this.props.reloadProjects())
                .catch((err) => debug('error is occuered: ', err))
        } else {
            this.props.reloadProjects();
        }
    }

    render() {
        return (
            <select className='select-host' defaultValue={ host.url } onChange={this.handleHostChanged}>
                <option value='http://fabnavi.org'>production</option>
                <option value='http://preview.fabnavi.org'>staging</option>
            </select>
        )
    }
}

HostSelector.propTypes = {
    isLoggedIn: PropTypes.bool,
    reloadProjects: PropTypes.func,
    signedOut: PropTypes.func,
    signingOut: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        reloadProjects: () => {
            dispatch(reloadProjects());
        },
        signingOut: () => {
            dispatch(signingOut());
        },
        signedOut: () => {
            api.clearCredential();
            api.clearUserId();
            dispatch(signedOut());
        },
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(HostSelector);
