import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Debug from 'debug';

const debug = Debug('fabnavi:components:backbutton');
class BackButton extends React.Component {
    render() {
        return (
            <div>
                <style jsx>{`
                    img {
                        width: 80%;
                        height: 65%;
                        margin: 20px -30px 0 0;
                    }
                `}</style>
                <a onClick={this.props.back} className="back-button">
                    <img src="./images/back.png" />
                </a>
            </div>
        );
    }
}

BackButton.propTypes = {
    back: PropTypes.func
}

function mapToStateProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        back: () => {
            api.getTopProject();
            dispatch(goBack())
        }
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(BackButton);
