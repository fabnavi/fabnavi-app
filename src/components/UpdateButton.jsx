import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

const debug = Debug('fabnavi:jsx:UpdateButton');

class UpdateButton extends Component {

    constructor(props) {
        super(props);
        this.onClick = () => {
            api.getAllProjects();
        }
    }

    render() {
        const update = this.props.update ? (
            <a onClick={this.onClick} className="update">Update</a>
        ) : (
            <p className="noUpdate">No Update</p>
        )

        return (
            <div className="updateButton">
                {update}
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.update) {
            return true;
        }
        return false;
    }
}

UpdateButton.propTypes = {
    update: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        update: state.manager.update
    };
}

export default connect(mapStateToProps)(UpdateButton);