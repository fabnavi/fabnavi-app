import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import { assetsPath } from '../utils/assetsUtils';
const debug = Debug('fabnavi:jsx:UpdateButton');

import { UpdateButtonStyle } from '../stylesheets/application/UpdateButton';

class UpdateButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = () => {
            api.getAllProjects();
        };
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.canUpdatePage ? (
                        <a onClick={this.onClick}>
                            <UpdateButtonStyle src={`${assetsPath}/images/update.png`} />
                        </a>
                    ) : (
                        <UpdateButtonStyle src={`${assetsPath}/images/no-update.png`} />
                    )}
                </div>
            </div>
        );
    }
}

UpdateButton.propTypes = {
    canUpdatePage: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        canUpdatePage: state.manager.canUpdatePage
    };
}

export default connect(mapStateToProps)(UpdateButton);
