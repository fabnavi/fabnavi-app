import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { sanitizeProject } from '../utils/projectUtils';
import { openMenu } from '../actions/projects';

const debug = Debug('fabnavi:jsx:ProjectElement');

class ProjectElement extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = () => {
            this.props.openMenu(this.props);
        }
    }

    render() {
        const actions = this.props.menuType == 'allProjects' ? (
            <ul className="actions">
                <li
                    className={`action-box ${this.props.menuIndex == 0 ? 'selected-action' : 'action'}`}
                    style="border-radius: 5px 5px 0px 0px;" >
                    <div className="menu2">
                        <img src="./src/images/p_play.png" />
                Play
                    </div>
                </li>
                <li className={`action-box ${this.props.menuIndex == 1 ? 'selected-action' : 'action'}`}>
                    <div className="menu2">
                        <img src="./src/images/p_detail.png" />
                Detail
                    </div>
                </li>
            </ul>
        ) : (
            <ul className="actions">
                <li className={`action-box ${this.props.menuIndex == 0 ? 'selected-action' : 'action'}`}>
                    <div className="menu5">
                        <img src="./src/images/p_play.png" />
                Play
                    </div>
                </li>
                <li className={`action-box ${this.props.menuIndex == 1 ? 'selected-action' : 'action'}`}>
                    <div className=".menu5">
                        <img src="./src/images/p_detail.png" />
                Detail
                    </div>
                </li>
                <li className={`action-box ${this.props.menuIndex == 2 ? 'selected-action' : 'action'}`}>
                    <div className="menu5">
                        <img src="./src/images/p_edit.png" />
                Edit
                    </div>
                </li>
                <li className={`action-box ${this.props.menuIndex == 3 ? 'selected-action' : 'action'}`}>
                    <div className="menu4">
                        <img src="./src/images/p_delete.png" />
                Delete
                    </div>
                </li>
            </ul>);

        const project = sanitizeProject(this.props.project);

        return (
            <div className={`project-box ${this.props.isSelected ? 'selected-project' : ''}`} onClick={this.onClick}>
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

ProjectElement.propTypes = {
    menuType: PropTypes.string,
    menuIndex: PropTypes.number,
    project: PropTypes.object,
    isSelected: PropTypes.bool,
    isOpenMenu: PropTypes.bool,
    openMenu: PropTypes.func
};

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        openMenu: (object) => {
            const selector = {
                index: object.manager.selector.index,
                menuIndex: 0,
                openMenu: true
            }
            dispatch(openMenu(selector));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectElement);