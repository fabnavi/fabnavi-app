import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import api from '../utils/WebAPIUtils';

import { assetsPath } from '../utils/assetsUtils';
const debug = Debug('fabnavi:jsx:UpdateButton');

import { UpdateButtonStyle } from '../stylesheets/application/UpdateButton';

export class UpdateButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.canUpdatePage ? (
                        <a onClick={this.handleClick}>
                            <UpdateButtonStyle src={`${assetsPath}/images/update.png`} />
                        </a>
                    ) : (
                        <UpdateButtonStyle src={`${assetsPath}/images/no-update.png`} />
                    )}
                </div>
            </div>
        );
    }
    handleClick() {
        api.getAllProjects();
    }
}

UpdateButton.propTypes = {
    canUpdatePage: PropTypes.bool
};

export function mapStateToProps(state) {
    return {
        canUpdatePage: state.manager.canUpdatePage
    };
}

export default connect(mapStateToProps)(UpdateButton);
