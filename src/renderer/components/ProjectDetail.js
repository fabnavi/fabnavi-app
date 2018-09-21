import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { push } from 'react-router-redux';
import ReactModal from 'react-modal';
import Player from './Player';

import { sanitizeProject } from '../utils/projectUtils';
import { assetsPath } from '../utils/assetsUtils';
import { closeDeleteConfirmation, deleteProject, confirmDeleteProject } from '../actions/manager';

import {
    StyledDetailFrame,
    ProjectTitle,
    ContentsFrame,
    DescriptionFrame,
    StyledHead,
    StyledDescription,
    StatusFrame,
    StatusText
} from '../stylesheets/application/ProjectShow/StyledProjectDetail';

const debug = Debug('fabnavi:jsx:ProjectDetail');

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

export class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.selectAction = mode => {
            if(this.props.project) {
                this.props.selectAction(this.props.project.id, mode);
            }
        };
        this.closeDeleteConfirmation = () => {
            this.props.closeDeleteConfirmation();
        };
        this.onDeleteProject = projectId => {
            this.props._deleteProject(projectId);
        };
    }

    componentWillMount() {
        ReactModal.setAppElement('body');
    }

    render() {
        if(!this.props.project) return <div />;
        const project = sanitizeProject(this.props.project);
        const isEditable = this.props.userIsAdmin || project.user.id === this.props.userId;
        return (
            <div>
                {project ? (
                    <StyledDetailFrame>
                        <ProjectTitle>{project.name}</ProjectTitle>
                        <Player />
                        <ContentsFrame>
                            <DescriptionFrame>
                                <StyledHead>Description</StyledHead>
                                <StyledDescription>{project.description}</StyledDescription>
                            </DescriptionFrame>
                            <StatusFrame>
                                <StyledHead>Project Author</StyledHead>
                                <StatusText>{project.user.nickname}</StatusText>
                                <StyledHead>Project Date</StyledHead>
                                <StatusText>{project.date}</StatusText>
                            </StatusFrame>
                        </ContentsFrame>
                        {isEditable ? (
                            <div>
                                <ActionIcon actionName="edit" handleClick={this.selectAction} />
                                <ActionIcon actionName="delete" handleClick={this.selectAction} />
                            </div>
                        ) : null}
                        {this.props.showDeleteConfirmation ? (
                            <ReactModal
                                isOpen={this.props.showDeleteConfirmation}
                                style={modalStyles}
                                onRequestClose={this.closeDeleteConfirmation}
                                contentLabel="delete confirmation"
                            >
                                <h2>Do you really want to delete this project ?</h2>
                                <p> project number is {this.props.targetProject}</p>
                                <button onClick={this.closeDeleteConfirmation}>close</button>
                                <a
                                    onClick={() => {
                                        this.onDeleteProject(this.props.targetProject);
                                    }}
                                >
                                    delete
                                </a>
                            </ReactModal>
                        ) : (
                            <span />
                        )}
                    </StyledDetailFrame>
                    // <div>
                    //     <PageLayout>
                    //         <Player />
                    //         <ProjectTitle>{project.name}</ProjectTitle>
                    //         <hr />
                    //         <div>
                    //             <ProjectDescription>{project.description}</ProjectDescription>
                    //         </div>
                    //         <BackButton />
                    //         {isEditable ? (
                    //             <div>
                    //                 <ActionIcon actionName="edit" handleClick={this.selectAction} />
                    //                 <ActionIcon actionName="delete" handleClick={this.selectAction} />
                    //             </div>
                    //         ) : null}
                    //         <div>
                    //             {this.props.showDeleteConfirmation ? (
                    //                 <ReactModal
                    //                     isOpen={this.props.showDeleteConfirmation}
                    //                     style={modalStyles}
                    //                     onRequestClose={this.closeDeleteConfirmation}
                    //                     contentLabel="delete confirmation"
                    //                 >
                    //                     <h2>Do you really want to delete this project ?</h2>
                    //                     <p> project number is {this.props.targetProject}</p>
                    //                     <button onClick={this.closeDeleteConfirmation}>close</button>
                    //                     <a
                    //                         onClick={() => {
                    //                             this.onDeleteProject(this.props.targetProject);
                    //                         }}
                    //                     >
                    //                         delete
                    //                     </a>
                    //                 </ReactModal>
                    //             ) : (
                    //                 <span />
                    //             )}
                    //         </div>
                    //     </PageLayout>
                    // </div>
                ) : (
                    <div> loading project... </div>
                )}
            </div>
        );
    }
}

const ActionIcon = ({ actionName, handleClick }) => {
    return (
        <div onClick={() => handleClick(actionName)}>
            <img src={`${assetsPath}/images/p_${actionName}.png`} />
            <span> {actionName} </span>
        </div>
    );
};

ProjectDetail.propTypes = {
    project: PropTypes.object,
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    userIsAdmin: PropTypes.bool,
    selectAction: PropTypes.func,
    showDeleteConfirmation: PropTypes.bool,
    closeDeleteConfirmation: PropTypes.func,
    _deleteProject: PropTypes.func,
    targetProject: PropTypes.number
};

export const mapStateToProps = state => ({
    project: state.manager.targetProject,
    userId: state.user.id,
    userIsAdmin: state.user.isAdmin,
    showDeleteConfirmation: state.modals.showDeleteConfirmation,
    targetProject: state.modals.targetProject
});

export const mapDispatchToProps = dispatch => ({
    selectAction: (projectId, mode) => {
        if(mode === 'delete') {
            dispatch(confirmDeleteProject(projectId));
        } else {
            dispatch(push(`/${mode}/${projectId}`));
        }
    },
    closeDeleteConfirmation: () => dispatch(closeDeleteConfirmation()),
    _deleteProject: projectId => dispatch(deleteProject(projectId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetail);
