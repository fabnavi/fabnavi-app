import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import { closeDeleteConfirmation, deleteProject } from '../actions/manager';

const debug = Debug('fabnavi:js:DeleteModal');

const modalStyles = {
    content: {
        top: '20%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-20%',
        transform: 'translate(-50%, -50%)'
    }
};

class DeleteModal extends React.Component {
    componentWillMount() {
        ReactModal.setAppElement('body');
    }

    constructor(props) {
        super(props);
        this.closeConfirmation = () => {
            this.props.closeConfirmation();
        };
        this.onDeleteProject = projectId => {
            this.props._deleteProject(projectId);
        };
    }

    render() {
        return (
            <ReactModal
                isOpen={this.props.showDeleteConfirmation}
                style={modalStyles}
                onRequestClose={this.closeConfirmation}
                contentLabel="delete confirmation"
            >
                <h2>Do you really want to delete this project ?</h2>
                <p> project number is {this.props.targetProject}</p>
                <button onClick={this.closeConfirmation}>close</button>
                <a
                    onClick={() => {
                        this.onDeleteProject(this.props.targetProject);
                    }}
                >
                    delete
                </a>
            </ReactModal>
        );
    }
}

DeleteModal.propTypes = {
    projects: PropTypes.shape({
        byId: PropTypes.object,
        allIds: PropTypes.arrayOf(PropTypes.number)
    }),
    targetProject: PropTypes.number,
    showDeleteConfirmation: PropTypes.bool,
    closeConfirmation: PropTypes.func,
    _deleteProject: PropTypes.func
};

const mapStateToProps = state => ({
    projects: state.manager.projects,
    targetProject: state.modals.targetProject,
    filter: state.manager.filter,
    showDeleteConfirmation: state.modals.showDeleteConfirmation
});

const mapDispatchToProps = dispatch => ({
    closeConfirmation: () => dispatch(closeDeleteConfirmation()),
    _deleteProject: id => dispatch(deleteProject(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteModal);
