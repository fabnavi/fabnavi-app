import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { sanitizeProject } from '../utils/projectUtils';
const debug = Debug('fabnavi:jsx:ProjectCard');
import { assetsPath } from '../utils/assetsUtils';

import {
    ProjectFrame,
    InsideFrame,
    ProjectThumb,
    ProjectTitle,
    ProjectDescription,
    StatusFrame,
    ProjectUser,
    UserStatusFrame,
    ProjectDate,
    UserName,
    ProjectMenu,
    MenuColmun,
    PrivateLabel,
} from '../stylesheets/application/ProjectIndex/StyledProjectCard';

export class ProjectCard extends React.Component {
    constructor(props) {
        super(props);
        this.toProjectDetail = () => {
            this.props.toProjectDetail(this.props.id);
        };
    }

    render() {
        const project = sanitizeProject(this.props);
        const projectType =
            typeof project.content[0] === 'undefined' ? 'Photo' : project.content[0].type.split('::')[1];
        const isPrivate = project.private;

        return (
            <div>
                <ProjectFrame onClick={this.toProjectDetail} index={this.props.index}>
                    <ProjectThumb>
                        <img src={project.thumbnail} />
                    </ProjectThumb>
                    <InsideFrame>
                        <ProjectTitle lang="ja">{project.name}</ProjectTitle>
                        {project.description === '' ? (
                            <ProjectDescription>No Description</ProjectDescription>
                        ) : (
                            <ProjectDescription>{project.description}</ProjectDescription>
                        )}
                        <StatusFrame>
                            <ProjectUser src={project.userIcon} user={true} />
                            <UserName>{project.user.nickname}</UserName>
                        </StatusFrame>
                    </InsideFrame>
                    {isPrivate && <PrivateLabel src={`${assetsPath}/images/PrivateLabel.png`}/>}
                </ProjectFrame>
            </div>
        );
    }
}

ProjectCard.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
    selectMenuItem: PropTypes.func,
    toggleMenu: PropTypes.func,
    selectedId: PropTypes.number,
    toProjectDetail: PropTypes.func,
    index: PropTypes.number
};

const mapDispatchToProps = dispatch => ({
    toProjectDetail: projectId => {
        dispatch(push(`/detail/${projectId}`));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(ProjectCard);
