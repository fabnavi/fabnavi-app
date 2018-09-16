import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Debug from 'debug';
import { assetsPath } from '../utils/assetsUtils';
import api from '../utils/WebAPIUtils';

import { BuckButtonStyle } from '../stylesheets/application/BackButton';

const debug = Debug('fabnavi:components:backbutton');
export class BackButton extends React.Component {
    render() {
        return (
            <div>
                <a onClick={this.props.back}>
                    <BuckButtonStyle src={`${assetsPath}/images/back.png`} />
                </a>
            </div>
        );
    }
}

BackButton.propTypes = {
    back: PropTypes.func
};

export function mapStateToProps(state) {
    return state;
}

export function mapDispatchToProps(dispatch) {
    return {
        back: () => {
            api.getTopProject();
            dispatch(goBack());
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BackButton);
