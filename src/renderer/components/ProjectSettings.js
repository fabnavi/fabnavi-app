import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { push } from 'react-router-redux';

import { sanitizeProject } from '../utils/projectUtils';
import { confirmDeleteProject } from '../actions/manager';
import { StyledEditButton, StyledDeleteButton } from '../stylesheets/application/ProjectShow/ProjectSettings';

const debug = Debug('fabnavi:js:ProjectSettings');

class ProjectSettings extends React.Component {
    constructor(props) {
        super(props);

        this.jumpToEdit = () => {
            if(this.props.project) {
                this.props.jumpToEdit(this.props.project.id);
            }
        };

        this.openDeleteModal = () => {
            if(this.props.project) {
                this.props.openDeleteModal(this.props.project.id);
            }
        };
    }

    render() {
        if(!this.props.project) return <div />;
        const isProjectSettings = this.props.mode === 'detail';
        const project = sanitizeProject(this.props.project);
        const isEditable = this.props.userIsAdmin || project.user.id === this.props.userId;
        const isDeletable = project.user.id === this.props.userId;
        return (
            <div>
                {isProjectSettings ? (
                    <div>
                        {isEditable && <EditButton handleClick={this.jumpToEdit} />}
                        {isDeletable && <DeleteButton handleClick={this.openDeleteModal} />}
                    </div>
                ) : null}
            </div>
        );
    }
}

const EditButton = ({ handleClick }) => {
    return (
        <div onClick={() => handleClick()}>
            <StyledEditButton>Edit</StyledEditButton>
        </div>
    );
};

const DeleteButton = ({ handleClick }) => {
    return (
        <div onClick={() => handleClick()}>
            <StyledDeleteButton>Delete</StyledDeleteButton>
        </div>
    );
};

ProjectSettings.propTypes = {
    project: PropTypes.object,
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    userIsAdmin: PropTypes.bool,
    mode: PropTypes.string,
    jumpToEdit: PropTypes.func,
    openDeleteModal: PropTypes.func
};

EditButton.propTypes = {
    handleClick: PropTypes.func
};

DeleteButton.propTypes = {
    handleClick: PropTypes.func
};

const mapStateToProps = state => ({
    project: state.manager.targetProject,
    userId: state.user.id,
    userIsAdmin: state.user.isAdmin,
    mode: state.manager.mode
});

const mapDispatchToProps = dispatch => ({
    jumpToEdit: projectId => {
        dispatch(push(`/edit/${projectId}`));
    },
    openDeleteModal: projectId => {
        dispatch(confirmDeleteProject(projectId));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectSettings);
