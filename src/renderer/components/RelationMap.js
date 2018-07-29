import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

const debug = Debug('fabnavi:js:RelatedMap');

/**
 * redux state
 *
 */

class RelationMap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        debug('props: ', this.props.relation);
        return <div>yeah</div>;
    }
}

export default connect(
    null,
    null
)(RelationMap);
