import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Debug from 'debug';
import { assetsPath } from '../utils/assetsUtils';
import api from '../utils/WebAPIUtils';

import { StyledBackButton } from '../stylesheets/application/BackButton';

const debug = Debug('fabnavi:components:backbutton');
class BackButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const shouldBackButton = !(this.props.mode === 'home' || this.props.mode === 'myprojects');
        return (
            <div>
                {shouldBackButton ? (
                    <StyledBackButton onClick={this.props.back} src={`${assetsPath}/images/back.png`} />
                ) : (
                    null
                )}
            </div>
        );
    }
}

BackButton.propTypes = {
    back: PropTypes.func,
    mode: PropTypes.string
};

const mapStateToProps = state => ({
    mode: state.manager.mode
});

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
