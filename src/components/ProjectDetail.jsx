import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import ProjectCard from './ProjectCard';
import { sanitizeProject } from '../utils/projectUtils';
import { colors, spaces } from '../stylesheets/config.js';
const debug = Debug('fabnavi:jsx:ProjectDetail');

class ProjectDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const project = sanitizeProject(this.props.project);
        return (
            <div>
                <style jsx>{`
                    .detail-page{
                        width: ${ spaces.solidWidth };
                        margin-right: auto;
                        margin-left: auto;
                    }
                    .detail-page h1{
                        font-size: 24px;
                        color: ${ colors.userNameColor };
                    } 
                    p {
                        margin-left: 10px;
                        color: black;
                        font-size: 20px;
                    }
                    .project-name {
                        font-size:17pt;
                        margin: 5px auto;
                        height:30px;
                        text-align: center;
                    }
                    .detail-description {
                        display: flex;
                    }
                `}</style>
                {project ? (
                    <div className="detail-page">
                        <h1>{project.name}</h1>
                        <hr />
                        <div className="detail-description">
                            <ProjectCard {...project} toggleMenu={()=>{}}/>
                            <div>
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
    project: PropTypes.object
};

const mapStateToProps = (state) => (
    {
        project: state.manager.targetProject
    }
)

export default connect(mapStateToProps)(ProjectDetail);
