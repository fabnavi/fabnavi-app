import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Debug from 'debug';
import { assetsPath } from '../utils/assetsUtils';

import { BuckButtonStyle } from '../stylesheets/application/BackButton';

const debug = Debug('fabnavi:components:backbutton');
class BackButton extends React.Component {
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

function mapToStateProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        back: () => {
            api.getTopProject();
            dispatch(goBack());
        }
    };
}

export default connect(
    mapToStateProps,
    mapDispatchToProps
)(BackButton);
