import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { sanitizeProject } from '../utils/projectUtils';
import { selectMenuAction } from '../actions/manager';

const debug = Debug('fabnavi:jsx:ProjectCard');

export default class ProjectCard extends React.Component {

    constructor(props) {
        super(props);
        this.selectItem = (mode) => {
            this.props.selectMenuItem(props.id, mode);
        }
    }

    render() {
        const project = sanitizeProject(this.props);
        const actions = <div>open</div>;
        const isSelected = this.props.selectedId === this.props.id;
        const isOwn = project.user.id === this.props.currentUserId;
        return (
            <div
                onClick={this.props.toggleMenu(this.props.id)}
                className={`project-box ${isSelected ? 'selected-project' : ''}`}>
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
                    {isSelected ? <Menu isOwn={isOwn} selectItem={this.selectItem} /> : null}
                </div>
            </div>
        );
    }
}
const Menu = ({ isOwn, selectItem }) => {
    return (
        <ul className="actions">
            {isOwn ?
                <div>
                    <MenuItem actionName="play" className="menu5" onClick={selectItem} />
                    <MenuItem actionName="detail" className="menu5" onClick={selectItem} />
                    <MenuItem actionName="edit" className="menu5" onClick={selectItem} />
                    <MenuItem actionName="delete" className="menu4" onClick={selectItem} />
                </div> :
                <div>
                    <MenuItem actionName="play" className="menu1" onClick={selectItem} />
                    <MenuItem actionName="detail" className="menu2" onClick={selectItem} />
                </div>}
        </ul>
    );
}

const MenuItem = ({ actionName, className, onClick }) =>
    <li className="action-box action"
        style={{ borderRadius: '5px 5px 0px 0px' }}
        onClick={onClick(actionName)}>
        <div className={className}>
            <img src={`./src/images/p_${actionName}.png`} />
            {actionName}
        </div>
    </li>
    ;


ProjectCard.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
    selectMenuItem: PropTypes.func,
    toggleMenu: PropTypes.func,
    selectedId: PropTypes.number
};