import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { push } from 'react-router-redux';
import Player from './Player';
import BackButton from './BackButton';

import { requestSearchAllProjects } from '../actions/manager';
import { sanitizeProject } from '../utils/projectUtils';
import { colors, spaces } from '../stylesheets/config.js';
const debug = Debug('fabnavi:jsx:ProjectDetail');

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.showEdit = () => {
            if(this.props.project) {
                this.props.showEdit(this.props.project.id);
            }
        };

        this.onSearchRelatedProjects = e => {
            e.preventDefault();
            const key = 'ハサミ';
            this.props.showRelatedProjects(key);
            debug('related objects: ', this.props.relatedProjects);
        };
    }

    render() {
        if(!this.props.project) return <div />;
        const project = sanitizeProject(this.props.project);
        const tags = project.tags.tags;
        const isTag = tags.length > 0 ? true : false;
        const isEditable = this.props.userIsAdmin || project.user.id === this.props.userId;
        return (
            <div>
                <style jsx>{`
                    .detail-page {
                        width: ${spaces.solidWidth};
                        margin-right: auto;
                        margin-left: auto;
                    }
                    .detail-page h1 {
                        font-size: 24px;
                        color: ${colors.userNameColor};
                    }
                    p {
                        color: black;
                        font-size: 20px;
                    }
                    .project-name {
                        font-size: 17pt;
                        margin: 5px auto;
                        height: 30px;
                        text-align: center;
                    }
                    .detail-description {
                        display: flex;
                    }
                    .tag-list {
                        list-style: none;
                    }
                    .related-projects-view {
                        display: flex;
                    }
                `}</style>
                {project ? (
                    <div className="detail-page">
                        <Player />
                        <h1>{project.name}</h1>
                        <hr />
                        <ul className="tag-list">
                            {isTag ? (
                                tags.map((tag, index) => {
                                    return (
                                        <li key={index} className="tag">
                                            #{tag.name}
                                        </li>
                                    );
                                })
                            ) : (
                                <p>none</p>
                            )}
                        </ul>
                        <hr />
                        <div className="detail-description">
                            <div>
                                <h1>Description</h1>
                                <p>{project.description}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="related-projects">
                            <div className="related-projects-view">related contents</div>
                            <button className="searching-related-projects" onClick={this.onSearchRelatedProjects}>
                                関連するコンテンツを表示
                            </button>
                        </div>
                        <BackButton />
                        {isEditable ? <EditButton handleClick={this.showEdit} /> : null}
                    </div>
                ) : (
                    <div> loading project... </div>
                )}
            </div>
        );
    }
}

const EditButton = ({ handleClick }) => {
    return <div onClick={() => handleClick()}>Edit Project</div>;
};

EditButton.propTypes = {
    handleClick: PropTypes.func
};

ProjectDetail.propTypes = {
    project: PropTypes.object,
    relatedProjects: PropTypes.object,
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    showEdit: PropTypes.func,
    userIsAdmin: PropTypes.bool,
    showRelatedProjects: PropTypes.func
};

const mapStateToProps = state => ({
    project: state.manager.targetProject,
    relatedProjects: state.manager.relatedProjects,
    userId: state.user.id,
    userIsAdmin: state.user.isAdmin
});

const mapDispatchToProps = dispatch => ({
    showEdit: projectId => {
        dispatch(push(`/edit/${projectId}`));
    },
    showRelatedProjects: key => {
        debug('search query: ', key);
        dispatch(requestSearchAllProjects(key));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetail);
