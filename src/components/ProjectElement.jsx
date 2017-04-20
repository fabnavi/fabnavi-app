import React from 'react';
import Debug from 'debug';

import { sanitizeProject } from '../utils/projectUtils';

const debug = Debug('fabnavi:jsx:ProjectElement');

export default class ProjectElement extends React.Component {

  render() {
    const actions = this.props.menuType == 'allProjects' ? (
      <ul className="actions">
        <li
          className={`action-box ${this.props.menuIndex == 0 ? 'selected-action' : 'action'}`}
          style="border-radius: 5px 5px 0px 0px;" >
          <div className="menu2">
            <img src="/images/p_play.png" />
            Play
          </div>
        </li>
        <li className={`action-box ${this.props.menuIndex == 1 ? 'selected-action' : 'action'}`}>
          <div className="menu2">
            <img src="/images/p_detail.png" />
            Detail
          </div>
        </li>
      </ul>
    ) : (
      <ul className="actions">
        <li className={`action-box ${this.props.menuIndex == 0 ? 'selected-action' : 'action'}`}>
          <div className="menu5">
            <img src="/images/p_play.png" />
            Play
          </div>
        </li>
        <li className={`action-box ${this.props.menuIndex == 1 ? 'selected-action' : 'action'}`}>
          <div className=".menu5">
            <img src="/images/p_detail.png" />
            Detail
          </div>
        </li>
        <li className={`action-box ${this.props.menuIndex == 2 ? 'selected-action' : 'action'}`}>
          <div className="menu5">
            <img src="/images/p_edit.png" />
            Edit
          </div>
        </li>
        <li className={`action-box ${this.props.menuIndex == 3 ? 'selected-action' : 'action'}`}>
          <div className="menu4">
            <img src="/images/p_delete.png" />
            Delete
          </div>
        </li>
      </ul>);

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
          {this.props.isOpenMenu ? actions : null}
        </div>
      </div>
    );
  }
}
