
import React from 'react';
import Debug from 'debug';

const debug = Debug('fabnavi:jsx:ProjectEditForm');

export default class ProjectEditForm extends React.Component {

  constructor(props) {
    super(props);
    const project = this.props.project;

    this.onClick = (e) => {
      e.preventDefault();
      api.updateProject(Object.assign({}, project, {
        name: this.state.name,
        description: this.state.description,
        private: this.state.private
      }))
      .then(res => {
        debug('upload success: ', res);
        api.getAllProjects();
      })
      .catch(err => {
        debug('Error from UpdateProject');
        debug(err);
      });
      return;
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
      name:project.name,
      description:project.description,
      private: project.private
    };
  }

  render() {
    return (
      <form className="form-box-edit">
        <div className="field_edit">
          <p className="edit">
            Project Name
          </p>
          <input
            className="form-edit"
            onChange={this.handleNameChange}
            value={this.state.name}
            type="text"/>
        </div>
        <div className="field_edit">
          <p className="edit">Private?</p>
          <input onChange={this.handlePublishStatusChange} type="checkbox"/>
        </div>
        <div className="field_edit">
          <p className="edit">Description</p>
          <textarea
            className="form-edit"
            onChange={this.handleDescriptionChange}
            value={this.state.description}
            rows="10" />
        </div>
        <button className="btn" type="submit" onClick={this.onClick}>
          S A V E
        </button>
      </form>
    );
  }
}