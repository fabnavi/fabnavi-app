import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { connect } from 'react-redux';

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
            <div className="editproject">
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
        updateProject: (project) => {
            dispatch({
                type: 'UPDATE_PROJECT',
                payload: project
            });
        }
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditForm);