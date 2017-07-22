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
        const project = sanitizeProject(this.props.project);
        return (
            <div>
                <style jsx>{`
                    .detail-page{
                        clear: both;
                        content: "";
                        display: block;
                        width: 1200px;
                        margin-right: auto;
                        margin-left: auto;
                        padding-top: 100px;
                        h1{
                            font-size: 24px;
                            color: #323232;
                        }
                        h2{
                            font-size: 18px;
                            color: #323232;
                        }
                    }
                    hr.detail{
                        border: 0;
                        border-bottom: 2px dashed black;
                        background: #fff;
                        width:100%;
                        margin-bottom: 40px;
                    }
                    .project-detail-box {
                        float: left;
                        background-color: white;
                        box-shadow: 0 0 0 1px #c8c8c8;
                        width: calc(25% - 25px);
                        float: left;
                        margin-left: 20px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                        padding-bottom:20px;
                        position:relative;
                        width:250px;
                        height:300px;
                        transition: 0.1s ease-in-out;
                        hr{
                            border: 0;
                            border-bottom: 2px dashed black;
                            background: #fff;
                            width:90%;
                            margin-top: 20px;
                            margin-bottom: 10px;
                        }
                    }
                    .detail-box{
                        margin-top: 80px;
                        margin-left: 300px;
                        width: 400px;
                        height: 400px;
                        p{
                            margin-left: 20px;
                            color: black;
                            font-size: 30px;
                        }
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
                        color: #323232;
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
                    .box::after{
                    padding-top: 130px;
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
                    }
                    .thumbnail {
                        width: 250px;
                        height: 140px;
                        margin: 0px auto;
                    }
                    .thumbnail img {
                        width: 250px;
                        height: 140px;
                        border-radius: 7px 7px 0px 0px;
                        border-color: black;
                    }
                `}</style>
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
