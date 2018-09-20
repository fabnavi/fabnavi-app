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
    ProjectThumbnail,
    ProjectTitle,
    ProjectName,
    ProjectIcon,
    CardBorder,
    ProjectBox,
    ProjectDescription
} from '../stylesheets/application/Card';

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

        return (
            <div>
                <ProjectFrame onClick={this.toProjectDetail}>
                    <ProjectThumbnail>
                        <img src={project.thumbnail} />
                    </ProjectThumbnail>
                    <ProjectTitle>
                        {projectType === 'Frame' ? (
                            <ProjectIcon src={`${assetsPath}/images/video-icon.png`} user={false} />
                        ) : (
                            <ProjectIcon src={`${assetsPath}/images/photo-icon.png`} user={false} />
                        )}
                        <ProjectName>{project.name}</ProjectName>
                        <ProjectIcon src={project.userIcon} user={true} />
                    </ProjectTitle>

                    <CardBorder />

                    <ProjectBox>
                        {project.description === '' ? (
                            <ProjectDescription>No Description</ProjectDescription>
                        ) : (
                            <ProjectDescription>{project.description}</ProjectDescription>
                        )}
                    </ProjectBox>
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
    toProjectDetail: PropTypes.func
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
