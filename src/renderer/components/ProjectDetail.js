import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { push } from 'react-router-redux';
import Player from './Player';
import BackButton from './BackButton';
import RelatedProjectCard from './RelatedProjectCard';

import { requestSearchAllProjects } from '../actions/manager';
import { sanitizeProject } from '../utils/projectUtils';

import {
    PageLayout,
    ProjectTitle,
    ProjectDescription,
    RelatedProjectsFrame
} from '../stylesheets/application/ProjectDetail';

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
        };
    }

    render() {
        if(!this.props.project) return <div />;
        const project = sanitizeProject(this.props.project);
        const tags = project.tags.tags;
        const isTag = tags.length > 0 ? true : false;
        const isEditable = this.props.userIsAdmin || project.user.id === this.props.userId;
        const projectIds = this.props.relatedProjects.allIds.length !== 0;
        const __relatedProjects = this.props.relatedProjects.byId;
        const _relatedProjects = Object.keys(__relatedProjects).map(key => {
            return __relatedProjects[key];
        });
        const relatedProjects = _relatedProjects.filter(self => self.name !== project.name);
        return (
            <div>
                {project ? (
                    <PageLayout>
                        <Player />
                        <ProjectTitle>{project.name}</ProjectTitle>
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
                        <div>
                            <ProjectDescription>{project.description}</ProjectDescription>
                        </div>
                        <hr />
                        <div>
                            {projectIds ? (
                                <RelatedProjectsFrame>
                                    {relatedProjects.map((rProject, index) => {
                                        debug(`${index}'s project: `, rProject);
                                        return <RelatedProjectCard key={index} project={rProject} />;
                                    })}
                                </RelatedProjectsFrame>
                            ) : (
                                <div>
                                    <p>show your projects</p>
                                    <button
                                        className="searching-related-projects"
                                        onClick={this.onSearchRelatedProjects}
                                    >
                                        関連するコンテンツを表示
                                    </button>
                                </div>
                            )}
                        </div>
                        <BackButton />
                        {isEditable ? <EditButton handleClick={this.showEdit} /> : null}
                    </PageLayout>
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
