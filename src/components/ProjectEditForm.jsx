import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { connect } from 'react-redux';

import { updateProject } from '../actions/manager';

const debug = Debug('fabnavi:jsx:ProjectEditForm');

class ProjectEditForm extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = (e) => {
            e.preventDefault();
            this.props.updateProject(Object.assign({}, this.props.project, {
                name: this.state.name,
                description: this.state.description,
                private: this.state.private
            }));
        };

        this.handleNameChange = (e) => {
            this.setState({ name : e.target.value });
        };

        this.handlePublishStatusChange = (e) => {
            this.setState({ private: e.target.checked });
        };

        this.handleDescriptionChange = (e) => {
            this.setState({ description : e.target.value });
        };

        this.state = {
            name: '',
            description: '',
            private: false
        };
    }

    componentWillReceiveProps(props) {
        if(props.project !== null) {
            this.setState({
                name: props.project.name,
                description: props.project.description,
                private: props.project.private
            });
        }
    }

    render() {
        const project = this.props.project;
        return (
            <div>
                <style jsx>{`
                    .edit-project{
                       clear: both;
                       content: "";
                       display: block;
                       margin-right: auto;
                       margin-left: auto;
                       width: 1200px;
                       padding-top: 100px;
                       hr{
                           border: 0;
                           border-bottom: 2px dashed black;
                            background: #fff;
                            width: 100%;
                       }
                       h1{
                            font-size: 24px;
                            color: #323232;
                        }

                        h2{
                            color: #323232;
                        }
                    }
                    .subtitle{
                        width: 60%;
                        color: #323232;
                        margin-right: -500px;
                    }
                    p.edit{
                        background-color: #C4C4C4;
                        color: black;
                        font-size: 20px;
                        margin-bottom:10px;
                    }
                    .btnsave{
                        float: right;
                        width: 140px;
                        height: 40px;
                        font-size: 12px;
                        padding:10px 30px;
                        background-color: gray;
                        border-radius: 3px;
                        color:#fff;
                        border-style: none;
                    }
                    .btndelete{
                        float: right;
                        width: 140px;
                        height: 40px;
                        font-size: 12px;
                        margin-bottom: 40px;
                        padding:10px 30px;
                        margin-right: 40px;
                        background-color: gray;
                        border-radius: 3px;
                        color:#fff;
                        border-style: none;
                    }
                    .btnsave:hover{
                        background-color: #40E0D0;
                        color:#fff;
                    }
                    .btndelete:hover{
                        background-color: red;
                        color:#fff;
                    }
                    .btn:hover{
                        background-color: #FF8F8F;
                        color:#fff;
                    }
                    .edit-pic{
                        img{
                            margin-right:14px;
                            margin-bottom:10px;
                            border-radius: 3px;
                            width:200px;
                            height:126px;
                        }
                        img:hover{
                            border-color: #FF8F8F;
                            box-shadow: 0 0 0 3px #FF8F8F
                        }
                        img:checked{
                            border-color: #FF8F8F;
                            box-shadow: 0 0 0 8px #FF8F8F
                        }
                        }

                        .edit-thumb{
                            img:active{
                            -webkit-filter: grayscale(100%);
                        }
                    }
                    input {
                        padding : 0;
                        margin : 0;
                    }
                    .form-title {
                        text-align : center;
                        width:100%;
                        font-size:30pt;
                    }
                    .form-edit {
                        width:60%;
                        font-size:14px;
                    }

                    .form-select {
                        font-size:100%;
                    }

                    .field_edit {
                        margin-bottom : 0px;
                    }

                    .actions  {
                        width: 300px;
                        height: 50px;
                        margin: 0 auto;
                        input {
                            width:100%;
                            height:100%;
                            font-size:100%;
                            border-radius:10px;
                            box-shadow: inset 0 0 1em #707070;
                        }
                    }

                    .pdf {
                        width:10%;
                        display : block;
                        margin : 0 auto;
                        margin-bottom:30px;
                        img {
                            width:100%;
                        }
                    }
                `}</style>
                <div className="edit-project">
                    {project ? (
                        <form className="form-box-edit">
                            <div className="field_edit">
                                <p className="edit">
                                    Project Name
                                </p>
                                <input
                                    className="form-nameedit"
                                    onChange={this.handleNameChange}
                                    value={this.state.name}
                                    type="text"/>
                            </div>
                            <div className="field_descriptionedit">
                                <p className="edit">
                                    Description
                                </p>
                                <textarea
                                    className="form-descriptionedit"
                                    onChange={this.handleDescriptionChange}
                                    value={this.state.description}
                                    rows="10"/>
                            </div>
                            <div className="field_edit">
                                <p className="edit">
                                    Private?
                                </p>
                                <input onChange={this.handlePublishStatusChange} type="checkbox"/>
                            </div>
                            <button className="btnsave" type="submit" onClick={this.onClick}>
                                S A V E
                            </button>
                        </form>
                    ) : (
                        <div> loading project... </div>
                    )}
                </div>
            </div>
        );
    }
}

ProjectEditForm.propTypes = {
    project: PropTypes.object,
    updateProject: PropTypes.func
};

const mapStateToProps = (state) => (
    {
        project: state.manager.targetProject
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        updateProject: (project) => dispatch(updateProject(project))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditForm);