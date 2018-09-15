import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Debug from 'debug';
import { assetsPath } from '../utils/assetsUtils';

import { BuckButtonStyle } from '../stylesheets/application/BackButton';

const debug = Debug('fabnavi:components:backbutton');
class BackButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isShowBuckButton = this.props.mode !== 'home' ? true : false;
        debug('isShowBackButton: ', isShowBuckButton);
        return (
            <div>
                {isShowBuckButton ? (
                    <a onClick={this.props.back}>
                        <BuckButtonStyle src={`${assetsPath}/images/back.png`} />
                    </a>
                ) : (
                    <span />
                )}
            </div>
        );
    }
}

BackButton.propTypes = {
    back: PropTypes.func,
    mode: PropTypes.string
};

const mapToStateProps = state => ({
    mode: state.manager.mode
});

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
