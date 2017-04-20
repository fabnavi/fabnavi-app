import React from 'react';
import Debug from 'debug';

const debug = Debug('fabnavi:jsx:CreateProject');

export default class CreateProject extends React.Component {

  constructor(props) {
    super(props);
    this.props = {};
    this.state = { name : '', description: '' };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name : e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ description : e.target.value });
  }

  handleSubmit() {
    api.createProject(this.state.name, 'Content::PhotoList', this.state.description);
  }

  render() {
    return (
      <div>
        <h1> className="form-title"> CreateProject </h1>
        <form className="form-box">
          <div className="field">
            <label> Project Name</label>
            <input className="form-text"
              onChange={this.handleNameChange}
              value={this.state.name}
              type="text" />
            <div className="field">
              <label> Project description </label>
              <textarea className="form-text"
                onChange={this.handleDescriptionChange}
                value={this.state.description}
                rows="10" />
            </div>
            center You need calibration sheet and Fixfox Addon !!
            Please print this PDF and install the Addon.
            <a className="pdf"
              href="https://drive.google.com/folderview?id=0B9k4M70SGKlAQ0xtTTNnOWgwOXM&usp=sharing"
              target="_blank">
              <img src="images/pdf.png" />
            </a>
            <a className="pdf"
              href="http://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi-preview/public/sonycameraremotecontroller.xpi"
              target="_blank">
              <img src="images/firefox-extension.png" />
            </a>
            <div className="actions">
              <input
                type="submit"
                value="CreateProject"
                onClick={this.handleSubmit} />
            </div>
          </div>
        </form>
      </div>

      );
  }
}
