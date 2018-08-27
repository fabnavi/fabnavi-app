import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import { assetsPath } from '../utils/assetsUtils';
import { reloadProjects } from '../actions/manager';

import { StyledReloadButton } from '../stylesheets/application/interface/StyledButton';

const debug = Debug('fabnavi:jsx:ReloadButton');

class ReloadButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = event => {
            event.preventDefault();
            this.props.reloadProjects();
        };
    }

    render() {
        return (
            <div>
                <div>
                    <a onClick={this.onClick}>
                        <StyledReloadButton src={`${assetsPath}/images/update.png`} />
                    </a>
                </div>
            </div>
        );
    }
}

ReloadButton.propTypes = {
    reloadProjects: PropTypes.func
};

function mapDispatchToProps(dispatch) {
    return {
        reloadProjects: () => {
            dispatch(reloadProjects());
        }
    };
}

export default connect(
    null,
    mapDispatchToProps
)(ReloadButton);
