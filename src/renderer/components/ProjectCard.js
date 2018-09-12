import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

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
    MenuColmun
} from '../stylesheets/application/ProjectIndex/StyledProjectCard';

export default class ProjectCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectItem = mode => () => {
            this.props.selectMenuItem(props.id, mode);
        };
    }

    render() {
        const project = sanitizeProject(this.props);
        const isSelected = this.props.selectedId === this.props.id;
        const isOwn = project.user.id === this.props.currentUserId;
        const projectType =
            typeof project.content[0] === 'undefined' ? 'Photo' : project.content[0].type.split('::')[1];

        return (
            <div>
                <ProjectFrame onClick={this.props.toggleMenu(this.props.id)} selected={isSelected}>
                    <ProjectThumb>
                        <img src={project.thumbnail} />
                    </ProjectThumb>
                    <InsideFrame>
                        <ProjectTitle>{project.name}</ProjectTitle>
                        {project.description === '' ? (
                            <ProjectDescription>No Description</ProjectDescription>
                        ) : (
                            <ProjectDescription>{project.description}</ProjectDescription>
                        )}
                        <StatusFrame>
                            <ProjectUser src={project.userIcon} user={true} />
                            <UserStatusFrame>
                                <UserName>{project.user.nickname}</UserName>
                                <ProjectDate>{project.date}</ProjectDate>
                            </UserStatusFrame>
                        </StatusFrame>
                        {isSelected ? <Menu isOwn={isOwn} selectItem={this.selectItem} /> : null}
                    </InsideFrame>
                </ProjectFrame>
            </div>
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
    selectedId: PropTypes.number
};
