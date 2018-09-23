import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { push } from 'react-router-redux';
import Player from './Player';
import DeleteModal from '../components/DeleteModal';
import CaptionList from './CaptionList';

import { sanitizeProject } from '../utils/projectUtils';

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

export class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.project) return <div />;
        const project = sanitizeProject(this.props.project);
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
                                <StyledHead>Author</StyledHead>
                                <StatusText>{project.user.nickname}</StatusText>
                                <StyledHead>Created Date</StyledHead>
                                <StatusText>{project.date}</StatusText>
                            </StatusFrame>
                        </ContentsFrame>
                        <CaptionList
                            figures={project.content.map(content => content.figure)}
                            contentType={this.props.contentType}
                        />
                        {this.props.showDeleteConfirmation ? <DeleteModal /> : <span />}
                    </StyledDetailFrame>
                ) : (
                    <div> loading project... </div>
                )}
            </div>
        );
    }
}

ProjectDetail.propTypes = {
    project: PropTypes.object,
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    userIsAdmin: PropTypes.bool,
    showDeleteConfirmation: PropTypes.bool,
    targetProject: PropTypes.number,
    contentType: PropTypes.string
};

export const mapStateToProps = state => ({
    project: state.manager.targetProject,
    userId: state.user.id,
    userIsAdmin: state.user.isAdmin,
    showDeleteConfirmation: state.modals.showDeleteConfirmation,
    targetProject: state.modals.targetProject,
    contentType: state.player.contentType
});

export default connect(
    mapStateToProps,
    null
)(ProjectDetail);
