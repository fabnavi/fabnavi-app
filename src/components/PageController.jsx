import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

const debug = Debug('fabnavi:components:PageController');

class PageController extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pageController">
                <div>
                    <a onClick={this.props.preview}> prev </a>
                </div>
                <hr />
                <a onClick={this.props.next}>next</a>
            </div>
        )
    }
}

PageController.propTypes = {
    preview: PropTypes.func,
    next: PropTypes.func
}

function mapToStateProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        preview: () => {
            debug('Move preview page action');
            dispatch({
                type: 'MOVE_PREV_PAGE'
            });
        },
        next: () => {
            debug('Move next page action');
            dispatch({
                type: 'MOVE_NEXT_PAGE'
            });
        }
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(PageController);