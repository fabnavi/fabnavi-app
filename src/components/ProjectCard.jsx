import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { sanitizeProject } from '../utils/projectUtils';
import { colors } from '../stylesheets/config.js';
const debug = Debug('fabnavi:jsx:ProjectCard');

export default class ProjectCard extends React.Component {

    constructor(props) {
        super(props);
        this.selectItem = (mode) => () => {
            this.props.selectMenuItem(props.id, mode);
        }
    }

    render() {
        const project = sanitizeProject(this.props);
        const isSelected = this.props.selectedId === this.props.id;
        const isOwn = project.user.id === this.props.currentUserId;
        return <div>
            <style jsx>{`
                .project-box{
                    margin: 10px 20px 20px;
                    position: relative;
                    width:250px;
                    height:300px;
                    border-radius: 0px 0px 7px 7px;
                    box-shadow: 6px 6px 2px #DDD;
                    transition: 0.1s ease-in-out;
                }
                .project-box:hover {
                    box-shadow: 0 0 0 3px #FF0000;
                    border-radius: 7px 7px 7px 7px;
                }
                .thumbnail {
                    width: 250px;
                    height: 140px;
                    margin: 0 auto;
                    overflow:hidden;
                }
                .thumbnail img{
                    width: 100%;
                    border-radius: 7px 7px 0 0;
                }
                hr{
                    border: 0;
                    border-bottom: 2px dashed black;
                    background: #fff;
                    width:90%;
                }
                .selected-project{
                    box-shadow: 0 0 0 3px #FF0000;
                    border-radius: 7px 7px 7px 7px;
                }
                .project-name {
                    font-size:17pt;
                    margin: 5px auto;
                    text-align: center;
                }
                .box {
                  display: grid;
                  padding: 1rem;
                  grid-template-columns:50px 1fr;
                }
                .user-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                    grid-row: 1 / 3;
                    grid-column: 1;
                }
                .username {
                    color: ${ colors.userNameColor };
                    text-overflow: ellipsis;
                    font-size: 12px;
                    grid-row: 1;
                    grid-colum: 2;
                }
                .date {
                    font-size: 12px;
                    grid-row: 2;
                    grid-column: 2;
                }
                .description{
                    font-size:14px;
                    color: ${ colors.grey };
                    word-break: break-all;
                    grid-row: 3;
                    grid-column: 1 / 3;
                }
            `}</style>
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
        </div>
    }
}

const Menu = ({ isOwn, selectItem }) => {
    return (
        <div className="actions">
            <style jsx>{`
                .actions {
                    position:absolute;
                    width: 250px;
                    top: 0;
                }
            `}</style>
            {isOwn ?
                <div>
                    <MenuItem actionName="play" onClick={selectItem} />
                    <MenuItem actionName="detail" onClick={selectItem} />
                    <MenuItem actionName="edit" onClick={selectItem} />
                    <MenuItem actionName="delete" onClick={selectItem} />
                </div> :
                <div>
                    <MenuItem actionName="play" onClick={selectItem} />
                    <MenuItem actionName="detail" onClick={selectItem} />
                </div>}
        </div>
    );
}

const MenuItem = ({ actionName, onClick }) =>
    <div onClick={onClick(actionName)}>
        <style jsx>{`
            .delete a{
                color: red;
            }
            div {
                background-color: rgba(125, 125, 125, 0.5);
            }
            div:hover {
                background-color: rgba(60, 60, 60, 0.5);
            }
        `}</style>
        <img src={`./images/p_${actionName}.png`} />
        <span> {actionName} </span>
    </div>;

ProjectCard.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
    selectMenuItem: PropTypes.func,
    toggleMenu: PropTypes.func,
    selectedId: PropTypes.number
};
