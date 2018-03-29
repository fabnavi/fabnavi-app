import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { sanitizeProject } from '../utils/projectUtils';
import { colors } from '../stylesheets/config.js';
const debug = Debug('fabnavi:jsx:ProjectCard');
import { assetsPath } from '../utils/assetsUtils';

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
        const projectType = project.content[0].type.split('::')[1];
        return (
            <div>
                <style jsx>{`
                    .project-box {
                        margin: 10px 20px 20px;
                        position: relative;
                        width: 250px;
                        height: 300px;
                        border-radius: 7px 7px 7px 7px;
                        box-shadow: 6px 6px 2px #ddd;
                        transition: 0.1s ease-in-out;
                    }
                    .project-box:hover {
                        box-shadow: 0 0 0 3px #ff0000;
                        border-radius: 7px 7px 7px 7px;
                    }
                    .thumbnail {
                        width: 250px;
                        height: 140px;
                        margin: 0 auto;
                        overflow: hidden;
                    }
                    .thumbnail img {
                        width: 100%;
                        border-radius: 7px 7px 0 0;
                    }
                    .title {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }
                    .title-img {
                        width: 30px;
                        height: 30px;
                        margin-left: 10px;
                    }
                    .user-icon {
                        width: 30px;
                        height: 30px;
                        border-radius: 100%;
                        margin-top: 5px;
                    }
                    hr {
                        border: 0;
                        border-bottom: 1px solid #5D5D5D;
                        background: #fff;
                        width: 90%;
                    }
                    .selected-project {
                        box-shadow: 0 0 0 3px #ff0000;
                        border-radius: 7px 7px 7px 7px;
                    }
                    .project-name {
                        width: 160px;
                        height: 40px;
                        margin: 0px;
                        padding: 0px;
                        font-size: 20px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        margin-top: 13px;
                        margin-left: 10px;
                        margin-bottom: -5px;
                    }
                    .box {
                        display: flex;
                        flex-direction: column;
                    }
                    .username {
                        color: ${colors.userNameColor};
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
                    .description p {
                        font-size: 14px;
                        color: ${colors.grey};
                        word-break: break-all;
                        margin: 0px;
                        margin-top: 10px;
                        margin-left: 20px;
                    }
                `}</style>
                <div
                    onClick={this.props.toggleMenu(this.props.id)}
                    className={`project-box ${
                        isSelected ? 'selected-project' : ''
                    }`}
                >
                    <div className="thumbnail">
                        <img src={project.thumbnail} />
                    </div>
                    <div className="title">
                        {
                            projectType === 'Frame' ? (
                                <img className="title-img" src={`${assetsPath}/images/video-icon.png`} />
                            ) : (
                                <img className="title-img" src={`${assetsPath}/images/photo-icon.png`} />
                            )}
                        <h3 className="project-name" title={project.name}>
                            {project.name}
                        </h3>
                        <img className="user-icon" src={project.userIcon} />
                    </div>

                    <hr />

                    <div className="box">
                        <div className="description">
                            {
                                project.description === '' ? (
                                    <p>No Description</p>
                                ) : (
                                    <p>{project.description}</p>
                                )}
                        </div>
                        {isSelected ? (
                            <Menu isOwn={isOwn} selectItem={this.selectItem} />
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

const Menu = ({ isOwn, selectItem }) => {
    return (
        <div className="actions">
            <style jsx>{`
                .actions {
                    position: absolute;
                    width: 250px;
                    top: 0;
                }
            `}</style>
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
        </div>
    );
};

const MenuItem = ({ actionName, onClick }) => (
    <div onClick={onClick(actionName)}>
        <style jsx>{`
            .delete a {
                color: red;
            }
            div :first-child {
                border-radius: 7px 7px 0 0;
            }
            div {
                background-color: rgba(125, 125, 125, 0.5);
            }
            div:hover {
                background-color: rgba(60, 60, 60, 0.5);
            }
        `}</style>
        <img src={`${assetsPath}/images/p_${actionName}.png`} />
        <span> {actionName} </span>
    </div>
);

ProjectCard.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
    selectMenuItem: PropTypes.func,
    toggleMenu: PropTypes.func,
    selectedId: PropTypes.number
};
