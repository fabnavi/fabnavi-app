import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { getThumbnailSrc, getUserIconSrc } from '../utils/projectUtils';
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
    ProjectDescription,
    ProjectMenu,
    MenuColmun
} from '../stylesheets/application/Card';

export default class ProjectCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const project = this.props.project;
        const projectType =
            typeof project.content[0] === 'undefined' ? 'Photo' : project.content[0].type.split('::')[1];
        const thumb = getThumbnailSrc(project);
        const userIcon = getUserIconSrc(project);
        return (
            <ProjectFrame>
                <ProjectThumbnail>
                    <img src={thumb} />
                </ProjectThumbnail>
                <ProjectTitle>
                    {projectType === 'Frame' ? (
                        <ProjectIcon src={`${assetsPath}/images/video-icon.png`} user={false} />
                    ) : (
                        <ProjectIcon src={`${assetsPath}/images/photo-icon.png`} user={false} />
                    )}
                    <ProjectName>{project.name}</ProjectName>
                    <ProjectIcon src={userIcon} user={true} />
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
        );
    }
}

const Menu = ({ isOwn, selectItem }) => {
    return (
        <ProjectMenu>
            {isOwn ? (
                <div>
                    <MenuItem actionName="play" onClick={selectItem} />
                    <MenuItem actionName="detail" onClick={selectItem} />
                    <MenuItem actionName="edit" onClick={selectItem} />
                    <MenuItem actionName="delete" onClick={selectItem} />
                </div>
            ) : (
                <div>
                    <MenuItem actionName="play" onClick={selectItem} />
                    <MenuItem actionName="detail" onClick={selectItem} />
                </div>
            )}
        </ProjectMenu>
    );
};

const MenuItem = ({ actionName, onClick }) => (
    <MenuColmun onClick={onClick(actionName)}>
        <img src={`${assetsPath}/images/p_${actionName}.png`} />
        <span> {actionName} </span>
    </MenuColmun>
);

ProjectCard.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
    selectMenuItem: PropTypes.func,
    toggleMenu: PropTypes.func,
    selectedId: PropTypes.number,
    project: PropTypes.object
};
