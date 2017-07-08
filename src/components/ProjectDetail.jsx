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
        const project = sanitizeProject(this.props.manager.targetProject);
        return (
            <div className="detail-page">
                <h1>ProjectDetail</h1>
                <hr className="detail"/>
                {project ? (
                    <div className="dtail-description">
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
                        <h1>Description</h1>
                        <p>{project.description}</p>
                    </div>
                ) : (
                    <div> loading project... </div>
                )}
            </div>
        );
    }

    componentWillMount() {
        if(!this.props.manager.targetProject) {
            debug('project not loaded!');
            api.getProject(this.props.match.params.projectId);
        }
    }
}

ProjectDetail.propTypes = {
    manager: PropTypes.shape({
        targetProject: PropTypes.object
    }),
    params: PropTypes.shape({
        projectId: PropTypes.string
    }),
};
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ProjectDetail);
