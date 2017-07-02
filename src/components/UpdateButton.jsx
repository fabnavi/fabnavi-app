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
        return (
            <div className="updateButton">
                {this.props.shouldUpdate
                    ? <a onClick={this.onClick} className="update">Update</a>
                    : <p className="noUpdate">No Update</p>
                }
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.shouldUpdate) {
            return true;
        }
        return false;
    }
}

UpdateButton.propTypes = {
    shouldUpdate: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        shouldUpdate: state.manager.shouldUpdate
    };
}

export default connect(mapStateToProps)(UpdateButton);