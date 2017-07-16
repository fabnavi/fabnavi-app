import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { selectMenuAction } from '../actions/manager.js';

const debug = Debug('fabnavi:jsx:ProjectMenu');

class ProjectMenu extends Component {

    constructor(props) {
        super(props);
        this.selectMenuAction = (mode) => {
            this.props.selectMenuAction(this.props.targetProject, mode);
        }
    }

    render() {
        const actions = this.props.menuType == 'allProjects' ? (
            <ul className="actions">
                <li
                    className={`action-box ${this.props.menuIndex == 0 ? 'selected-action' : 'action'}`}
                    style="border-radius: 5px 5px 0px 0px;"
                    onClick={() => {
                        this.selectMenuAction('play')
                    }}>
                    <div className="menu2">
                        <img src="./src/images/p_play.png" />
                Play
                    </div>
                </li>
                <li className={`action-box ${this.props.menuIndex == 1 ? 'selected-action' : 'action'}`}
                    onClick={() => {
                        this.selectMenuAction('detail')
                    }}>
                    <div className="menu2">
                        <img src="./src/images/p_detail.png" />
                Detail
                    </div>
                </li>
            </ul>
        ) : (
        <ul className="actions">
            <li className={`action-box ${this.props.menuIndex == 0 ? 'selected-action' : 'action'}`}
                onClick={()=>{
                    this.selectMenuAction('play')
                }}>
                <div className="menu5">
                    <img src="./src/images/p_play.png" />
                Play
                </div>
            </li>
            <li className={`action-box ${this.props.menuIndex == 1 ? 'selected-action' : 'action'}`}
                onClick={()=>{
                    this.selectMenuAction('detail')
                }}>
                <div className=".menu5">
                    <img src="./src/images/p_detail.png" />
                Detail
                </div>
            </li>
            <li className={`action-box ${this.props.menuIndex == 2 ? 'selected-action' : 'action'}`}
                onClick={()=>{
                    this.selectMenuAction('edit')
                }}>
                <div className="menu5">
                    <img src="./src/images/p_edit.png" />
                Edit
                </div>
            </li>
            <li className={`action-box ${this.props.menuIndex == 3 ? 'selected-action' : 'action'}`}
                onClick={()=>{
                    this.selectMenuAction('delete')
                }}>
                <div className="menu4">
                    <img src="./src/images/p_delete.png" />
                Delete
                </div>
            </li>
        </ul>;

        return (
            <div>{ actions }</div>
        )
    }
}

ProjectMenu.propTypes = {
    menuType: PropTypes.string,
    menuIndex: PropTypes.number,
    targetProject: PropTypes.object,
    isSelected: PropTypes.bool,
    isOpenMenu: PropTypes.bool,
    selectMenuAction: PropTypes.func,
};

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        selectMenuAction: (project, mode) => {
            debug('select menu action');
            dispatch({
                type: 'SELECT_PROJECT_MENU',
                targetProject: project,
                mode: mode
            });
            dispatch(push(`/${mode}/${project.projectId}`));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMenu);
