import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import { sanitizeProject } from '../utils/projectUtils';
const debug = Debug('fabnavi:jsx:ProjectDetail');

class ProjectDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const project = sanitizeProject(this.props.targetProject);
        return (
            <div>
                {project ? (
                    <div className="detail-page">
                        <h1>{project.name}</h1>
                        <hr className="detail"/>
                        <div className="detail-description">
                            <div className="project-detail-box">
                                <div className="thumbnail">
                                    <img src={project.thumbnail}/>
                                </div>
                                <h2 className="project-name">
                                    {project.name}
                                </h2>
                                <hr/>
                                <div className="box">
                                    <img className="user-icon" src={project.userIcon} />
                                    <div className="username">
                                        {project.user.nickname}
                                    </div>
                                    <div className="date">
                                        {project.date}
                                    </div>
                                </div>
                            </div>
                            <div className="detail-box">
                                <h1>Description</h1>
                                <p>{project.description}</p>
                            </div>
                        </div>
                        </div>
                ) : (
                    <div> loading project... </div>
                )}
            </div>
        );
    }
}

ProjectDetail.propTypes = {
    targetProject: PropTypes.object
};

function mapStateToProps(state) {
    return {
        targetProject: state.manager.targetProject
    }
}

export default connect(mapStateToProps)(ProjectDetail);
