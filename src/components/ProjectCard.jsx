import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { sanitizeProject } from '../utils/projectUtils';
import { colors, spaces } from '../stylesheets/config.js';
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
                    {isSelected ? <Menu isOwn={isOwn} selectItem={this.selectItem} /> : null}
                </div>
            </div>
        </div>
    }
}

const Menu = ({ isOwn, selectItem }) => {
    return (
        <div>
            <style jsx>{`
                div.actions {
                    position:absolute;
                    top: 0px;
                    left:0px;
                    padding:0px;
                    margin:0px;
                    width: 250px;
                    height:0px;
                }
            `}</style>
            <div className="actions">
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
            </div>
        </div>
    );
}

const MenuItem = ({ actionName, className, onClick }) =>
    <div>
        <style jsx>{`
            .menu2 {
                height: calc(${ spaces.thumbHeight }/2)px;
            }
            .menu3 {
                height: calc(${ spaces.thumbHeight }/3)px;
            }
            .menu4 {
                height: calc(${ spaces.thumbHeight }/4)px;
            }
            .menu5 {
                height: calc(${ spaces.thumbHeight }/5)px;
            }
            .action-box{
                border-radius: 5px 5px 0px 0px;
            }
            .action-box::after p{
                margin-top: -7px;
            }
            .action-box::after img {
                width: calc(27 * 0.8)px;
                margin:  calc(27 * 0.1)px;
                margin-bottom: -4px;
            }
            .action-box::after span {
                margin-top:2px;
            }
            .action-box::after{
                background-color: rgba(54, 48, 48, 0.8);
                padding-top: 5px;
            }
        `}</style>
        <li className="action-box action"
            onClick={onClick(actionName)}>
            <div className={className}>
                <img src={`./images/p_${actionName}.png`} />
                {actionName}
            </div>
        </li>
    </div>;

ProjectCard.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
    selectMenuItem: PropTypes.func,
    toggleMenu: PropTypes.func,
    selectedId: PropTypes.number
};
