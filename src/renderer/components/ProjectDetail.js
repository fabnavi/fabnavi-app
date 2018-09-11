import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { push } from 'react-router-redux';
import Player from './Player';
import BackButton from './BackButton';

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

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.showEdit = () => {
            if(this.props.project) {
                this.props.showEdit(this.props.project.id);
            }
        };
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
                                <StatusText>hogehoghoehogehoge</StatusText>
                                <StyledHead>Project Date</StyledHead>
                                <StatusText>fugafuga</StatusText>
                            </StatusFrame>
                        </ContentsFrame>
                        <BackButton />
                        {isEditable ? <EditButton handleClick={this.showEdit} /> : null}
                    </StyledDetailFrame>
                ) : (
                    <div> loading project... </div>
                )}
            </div>
        );
    }
}

const EditButton = ({ handleClick }) => {
    return <div onClick={() => handleClick()}>Edit Project</div>;
};

EditButton.propTypes = {
    handleClick: PropTypes.func
};

ProjectDetail.propTypes = {
    project: PropTypes.object,
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    showEdit: PropTypes.func,
    userIsAdmin: PropTypes.bool
};

const mapStateToProps = state => ({
    project: state.manager.targetProject,
    userId: state.user.id,
    userIsAdmin: state.user.isAdmin
});

const mapDispatchToProps = dispatch => ({
    showEdit: projectId => {
        dispatch(push(`/edit/${projectId}`));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetail);
