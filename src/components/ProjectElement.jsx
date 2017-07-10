import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { sanitizeProject } from '../utils/projectUtils';
import ProjectMenu from './ProjectMenu';

const debug = Debug('fabnavi:jsx:ProjectElement');

export default class ProjectElement extends React.Component {

    render() {
        const project = sanitizeProject(this.props.project);

        return (
            <div className={`project-box ${this.props.isSelected ? 'selected-project' : ''}`}>
                <div className="thumbnail">
                    <img src={project.thumbnail}/>
                </div>
                <h1 className="project-name">
                    {project.name}
                </h1>
                <hr/>
                <div className="box">
                    <img className="user-icon" src={project.userIcon}/>
                    <div className="username">
                        {project.user.nickname}
                    </div>
                    <div className="date">
                        {project.date}
                    </div>
                    <div className="description">
                        {project.description}
                    </div>
                    <ProjectMenu targetProject={project} menuIndex={0}/>
                </div>
            </div>
        );
    }
}

ProjectElement.propTypes = {
    project: PropTypes.object,
    isSelected: PropTypes.bool,
    isOpenMenu: PropTypes.bool,
};