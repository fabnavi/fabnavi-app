import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { push } from 'react-router-redux';
import Player from './Player';
import BackButton from './BackButton';

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
                `}</style>
                {project ? (
                    <div className="detail-page">
                        <Player />
                        <h1>{project.name}</h1>
                        <hr />
                        <ul className="tag-list">
                            {isTag ? (
                                tags.map((item, index) => {
                                    return (
                                        <li key={index} className="tag">
                                            {item.name}
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
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    showEdit: PropTypes.func,
    userIsAdmin: PropTypes.bool
};

const mapStateToProps = state => ({
    project: state.manager.targetProject,
    userId: state.user.id,
    userIsAdmin: state.user.isAdmin
});

const mapDispatchToProps = dispatch => ({
    showEdit: projectId => {
        dispatch(push(`/edit/${projectId}`));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetail);
