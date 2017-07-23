import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { sanitizeProject } from '../utils/projectUtils';
import { colors, spaces } from '../stylesheets/config.js';
import ProjectMenu from './ProjectMenu';
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
        const actions = <div>open</div>;
        const isSelected = this.props.selectedId === this.props.id;
        const isOwn = project.user.id === this.props.currentUserId;
        return <div>
            <style jsx>{`
                .project-box{
                    grid-column: span 3;
                    margin-top: 10px;
                    margin-bottom: 20px;
                    padding-bottom:20px;
                    margin-right: 20px;
                    margin-left: 20px;
                    position: relative;
                    width:250px;
                    height:300px;
                    border-radius: 0px 0px 7px 7px;
                    box-shadow: 6px 6px 2px #DDD;
                    transition: 0.1s ease-in-out;
                    float: left;
                }
                hr{
                    border: 0;
                    border-bottom: 2px dashed black;
                    background: #fff;
                    width:90%;
                }
                .project-box:hover {
                    box-shadow: 0 0 0 3px #FF0000;
                    border-radius: 7px 7px 7px 7px;
                }
                .selected-project{
                    width: 250px;
                    height: 300px;
                    box-shadow: 0 0 0 3px #FF0000;
                    border-radius: 7px 7px 7px 7px;
                }
                .project-name {
                    font-size:17pt;
                    margin-bottom:5px;
                    margin-top: 5px;
                    height:30px;
                    text-align: center;
                }
                .date {
                    width: 50%;
                    float: left;
                    margin-left:0%;
                    margin-bottom: 4px;
                    font-size: 12px;
                    margin-right: 12px;
                }
                .user-icon {
                    float: left;
                    width: 40px;
                    height: 40px;
                    margin-left: 20px;
                    margin-right:5px;
                    border-radius: 100%;
                }
                .username {
                    float: left;
                    width: 60%;
                    color: ${ colors.userNameColor };
                    overflow: auto;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 12px;
                    padding-top:4px;
                }
                .user {
                    float: left;
                    width: 50%;
                }
                .description{
                    font-size:14px;
                    float: left;
                    margin-left: 20px;
                    margin-right:20px;
                    margin-top: 8px;
                    color: ${ colors.grey };
                    word-break: break-all;
                }
                .box::after{
                    padding-top: 130px;
                }
                .box-title{
                    width: calc(50% - 50px);
                    float: left;
                    margin-left: 50px;
                    left: calc(25% - 25px + 20px);
                    position: relative;
                    font-size: 35pt;
                }
                .box-close {
                    width: calc(20% - 20px);
                    float: left;
                    margin-left: 15px;
                    font-size: 25pt;
                    cursor:pointer;
                }
                .box-desc {
                    width: calc(40% - 40px);
                    float: left;
                    margin-left: 40px;
                    left: calc(25% - 25px + 20px);
                    position: relative;
                    font-size: 15pt;
                }
                .box-img{
                    transform:rotateZ(180deg);
                    width: calc(40% - 40px);
                    float: left;
                    margin-left: 40px;
                    left: calc(25% - 25px + 20px);
                    position: relative;
                    margin-top:20px;
                    margin-bottom:40px;
                }
                .thumbnail {
                    width: 250px;
                    height: 140px;
                    margin: 0px auto;
                }
                .thumbnail img{
                    width: 250px;
                    height: 140px;
                    border-radius: 7px 7px 0px 0px;
                    border-color: black;
                }
                .selected-action {
                    color: red ;
                }
                .delete a{
                    color: red;
                }
                .hide {
                    display: none;
                }
                .logo{
                    padding: 0;
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
                    {isSelected ? <ProjectMenu isOwn={isOwn} selectItem={this.selectItem} /> : null}
                </div>
            </div>
        </div>
    }
}

ProjectCard.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
    selectMenuItem: PropTypes.func,
    toggleMenu: PropTypes.func,
    selectedId: PropTypes.number
};
