import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

const debug = Debug('fabnavi:jsx:Test');

import { testAction } from '../actions/manager';

class Test extends Component {
    constructor(props) {
        super(props);

        this.onClick = () => {
            this.props.onTest();
        }
    }

    render() {
        return (
            <div className="test">
                <a onClick={this.onClick}>
                    test action
                </a>
            </div>
        )
    }
}

Test.propTypes = {
    onTest: PropTypes.func
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    const obj = {
        hoge: 1,
        fuga: 2
    }
    return {
        onTest: () => {
            dispatch(testAction(obj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);