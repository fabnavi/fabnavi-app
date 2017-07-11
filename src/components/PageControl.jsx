import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import { movePrevPage, moveNextPage } from '../actions/manager.js';

const debug = Debug('fabnavi:components:PageControl');

class PageControl extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pageControl">
                <a onClick={this.props.preview}> prev </a>
                <hr />
                <a onClick={this.props.next}>next</a>
            </div>
        )
    }
}

PageControl.propTypes = {
    preview: PropTypes.func,
    next: PropTypes.func,
    currentPage: PropTypes.number,
    requestPage: PropTypes.number
}

function mapToStateProps(state) {
    return {
        currentPage: state.manager.currentPage,
        requestPage: state.manager.requestPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        preview: () => {
            debug('Move preview page action');
            dispatch(movePrevPage());
        },
        next: () => {
            debug('Move next page action');
            dispatch(moveNextPage());
        }
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(PageControl);