import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import { closeDeleteConfirmation, deleteProject } from '../actions/manager';
import {
    ModalFrame,
    StyledThumbnail,
    StyledProjectName,
    InterfaceFrame
} from '../stylesheets/application/ProjectIndex/StyledDeleteModal';
import { Button } from '../stylesheets/application/interface/StyledButton';

const debug = Debug('fabnavi:js:DeleteModal');

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-20%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: {
        backgroundColor: 'rgba(19,19,19,0.8)'
    }
};

class DeleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.closeConfirmation = () => {
            this.props.closeConfirmation();
        };
        this.onDeleteProject = projectId => {
            this.props._deleteProject(projectId);
        };
    }

    componentWillMount() {
        ReactModal.setAppElement('body');
    }

    render() {
        const project = this.props.targetProject;
        const thumb = project.content[0].figure.file.thumb.url;
        return (
            <ReactModal
                isOpen={this.props.showDeleteConfirmation}
                style={modalStyles}
                onRequestClose={this.closeConfirmation}
                contentLabel="delete confirmation"
            >
                <ModalFrame>
                    <StyledThumbnail src={thumb} />
                    <StyledProjectName>
                        「{project.name}」を削除しますか？
                    </StyledProjectName>
                    <InterfaceFrame>
                        <Button
                            onClick={() => {
                                this.onDeleteProject(project.id);
                            }}
                        >
                            Delete
                        </Button>
                        <Button cancel onClick={this.closeConfirmation}>
                            Cancel
                        </Button>
                    </InterfaceFrame>
                </ModalFrame>
            </ReactModal>
        );
    }
}

DeleteModal.propTypes = {
    projects: PropTypes.shape({
        byId: PropTypes.object,
        allIds: PropTypes.arrayOf(PropTypes.number)
    }),
    targetProject: PropTypes.object,
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
