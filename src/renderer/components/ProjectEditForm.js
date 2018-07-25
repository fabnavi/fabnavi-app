import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { connect } from 'react-redux';
import { debounce } from 'throttle-debounce';

import { updateProject } from '../actions/manager';

import Player from './Player';
import CaptionsField from './ProjectEditForm/CaptionsField';

const debug = Debug('fabnavi:jsx:ProjectEditForm');

class ProjectEditForm extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = e => {
            e.preventDefault();
            this.props.updateProject(
                Object.assign({}, this.props.project, {
                    name: this.state.name,
                    tag_list: this.state.tag_list,
                    description: this.state.description,
                    private: this.state.private,
                    figures: this.state.figures
                })
            );
        };

        this.handleNameChange = e => {
            this.setState({ name: e.target.value });
        };

        this.handlePublishStatusChange = e => {
            this.setState({ private: e.target.checked });
        };

        this.handleDescriptionChange = e => {
            this.setState({ description: e.target.value });
        };

        this.changeCaptions = debounce(500, this.changeCaptions);

        this.onAddCaptionButtonClick = e => {
            e.preventDefault();
            const index = parseInt(e.target.dataset.index, 10);
            if(!this.state.figures) return;
            this.setState({
                figures: this.state.figures.map((figure, i) => {
                    if(i !== index) return figure;
                    figure.captions.push({
                        id: null,
                        start_sec: 0,
                        end_sec: 0,
                        text: ''
                    });
                    return figure;
                })
            });
        };

        this.onAddTagButtonClick = e => {
            e.preventDefault();
            this.state.tag_list.push('');
            this.setState({
                tag_list: this.state.tag_list
            });
        };

        this.handleTagNameChange = (e, index) => {
            this.state.tag_list[index] = e.target.value;
            this.setState({
                tag_list: this.state.tag_list
            });
        };

        this.onDeleteTagButtonClick = (e, index) => {
            e.preventDefault();
            this.state.tag_list.splice(index, 1);
            this.setState({
                tag_list: this.state.tag_list
            });
        };

        this.updatePlayer = figures => {
            const content = this.props.project.content.map((cont, i) => {
                cont.figure = figures[i];
                return cont;
            });
            const project = Object.assign({}, this.props.project, {
                content: content
            });
            this.setState({ project: project });
        };

        this.state = {
            name: '',
            tag_list: [],
            description: '',
            private: false,
            figures: [],
            captions: []
        };
    }

    handlerCaptionsChange(e) {
        this.changeCaptions(e.nativeEvent);
    }

    changeCaptions(e) {
        const li = e.target.parentNode;
        const figureIndex = parseInt(li.dataset.figureIndex, 10);
        const captionIndex = parseInt(li.dataset.index, 10);
        const name = e.target.name;
        const figures = this.state.figures.map((figure, i) => {
            if(i !== figureIndex) return figure;
            if(name === 'text') {
                figure.captions[captionIndex][name] = e.target.value;
            } else if(name === '_destroy') {
                figure.captions[captionIndex][name] = e.target.checked;
            } else {
                figure.captions[captionIndex][name] = parseInt(e.target.valueAsNumber, 10) / 1000;
            }
            return figure;
        });
        this.setState({ figures: figures });
        this.updatePlayer(figures);
    }

    componentWillReceiveProps(props) {
        if(props.project !== null) {
            this.setState({
                name: props.project.name,
                tag_list: props.project.tags.tags.map(tag => tag.name),
                description: props.project.description,
                private: props.project.private,
                figures: props.project.content.map(content => content.figure),
                captions: props.project.content[0].figure.captions
            });
        }
    }

    render() {
        const project = this.props.project;
        return (
            <div>
                <style jsx>{`
                    .edit-project {
                        clear: both;
                        content: '';
                        display: block;
                        margin-right: auto;
                        margin-left: auto;
                        width: 1620px;
                        padding-top: 60px;
                    }
                    .edit-project hr {
                        border: 0;
                        border-bottom: 2px dashed black;
                        background: #fff;
                        width: 100%;
                    }
                    .edit-project h1 {
                        font-size: 24px;
                        color: #323232;
                    }
                    .edit-project h2 {
                        color: #323232;
                    }
                    .subtitle {
                        width: 60%;
                        color: #323232;
                        margin-right: -500px;
                    }
                    .edit-project p {
                        background-color: #c4c4c4;
                        color: black;
                        font-size: 20px;
                        margin-bottom: 10px;
                    }
                    .btnsave {
                        float: right;
                        width: 140px;
                        height: 40px;
                        font-size: 12px;
                        padding: 10px 30px;
                        background-color: gray;
                        border-radius: 3px;
                        color: #fff;
                        border-style: none;
                    }
                    .btndelete {
                        float: right;
                        width: 140px;
                        height: 40px;
                        font-size: 12px;
                        margin-bottom: 40px;
                        padding: 10px 30px;
                        margin-right: 40px;
                        background-color: gray;
                        border-radius: 3px;
                        color: #fff;
                        border-style: none;
                    }
                    .btnsave:hover {
                        background-color: #40e0d0;
                        color: #fff;
                    }
                    .btndelete:hover {
                        background-color: red;
                        color: #fff;
                    }
                    .btn:hover {
                        background-color: #ff8f8f;
                        color: #fff;
                    }
                    .edit-pic img {
                        margin-right: 14px;
                        margin-bottom: 10px;
                        border-radius: 3px;
                        width: 200px;
                        height: 126px;
                    }
                    .edit-pic img:hover {
                        border-color: #ff8f8f;
                        box-shadow: 0 0 0 3px #ff8f8f;
                    }
                    .edit-pic img:checked {
                        border-color: #ff8f8f;
                        box-shadow: 0 0 0 8px #ff8f8f;
                    }
                    .edit-thumb img:active {
                        -webkit-filter: grayscale(100%);
                    }
                    input {
                        padding: 0;
                        margin: 0;
                    }
                    .form-title {
                        text-align: center;
                        width: 100%;
                        font-size: 30pt;
                    }
                    .form-edit {
                        width: 60%;
                        font-size: 14px;
                    }

                    .form-select {
                        font-size: 100%;
                    }

                    .field_edit {
                        margin-bottom: 0px;
                    }
                    .actions {
                        width: 300px;
                        height: 50px;
                        margin: 0 auto;
                    }
                    .actions input {
                        width: 100%;
                        height: 100%;
                        font-size: 100%;
                        border-radius: 10px;
                        box-shadow: inset 0 0 1em #707070;
                    }

                    .pdf {
                        width: 10%;
                        display: block;
                        margin: 0 auto;
                        margin-bottom: 30px;
                    }
                    .pdf img {
                        width: 100%;
                    }
                    .edit-captions {
                        display: flex;
                    }
                `}</style>
                <div className="edit-project">
                    {project && project.content ? (
                        <form className="form-box-edit">
                            <div className="edit-captions">
                                <Player project={this.state.project} size="small" />
                                <CaptionsField
                                    figures={project.content.map(content => content.figure)}
                                    handleCaptionsChange={this.handlerCaptionsChange.bind(this)}
                                    onAddCaptionButtonClick={this.onAddCaptionButtonClick}
                                />
                            </div>

                            <div className="field_edit">
                                <p className="edit">Project Name</p>
                                <input
                                    className="form-nameedit"
                                    onChange={this.handleNameChange}
                                    value={this.state.name}
                                    type="text"
                                />
                            </div>
                            <div className="field_tagedit">
                                <p className="edit">Project Tags</p>
                                <div className="field_caption">
                                    <span style={{ marginLeft: '35px' }}>Tag Name</span>
                                </div>
                                <ul style={{ paddingLeft: '0px' }}>
                                    {this.state.tag_list.length > 0 ? (
                                        this.state.tag_list.map((tag, index) => {
                                            return (
                                                <li key={index} className="tag">
                                                    #{index + 1} :
                                                    <input
                                                        className="form-nameedit"
                                                        style={{ marginLeft: '10px' }}
                                                        name="edit_tag"
                                                        data-index={index}
                                                        type="text"
                                                        defaultValue={tag}
                                                        onChange={e => this.handleTagNameChange(e, index)}
                                                    />
                                                    <button
                                                        style={{ marginLeft: '30px' }}
                                                        className="deleteTagButton"
                                                        onClick={e => this.onDeleteTagButtonClick(e, index)}
                                                    >
                                                        destroy !
                                                    </button>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <span># --： add project tag !</span>
                                    )}
                                </ul>
                                <button className="addTagButton" onClick={this.onAddTagButtonClick}>
                                    add tag
                                </button>
                            </div>
                            <div className="field_descriptionedit">
                                <p className="edit">Description</p>
                                <textarea
                                    className="form-descriptionedit"
                                    onChange={this.handleDescriptionChange}
                                    value={this.state.description}
                                    rows="10"
                                />
                            </div>
                            <div className="field_edit">
                                <p className="edit">Private?</p>
                                <input
                                    onChange={this.handlePublishStatusChange}
                                    type="checkbox"
                                    defaultChecked={this.state.private}
                                />
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

const mapStateToProps = state => ({
    project: state.manager.targetProject
});

const mapDispatchToProps = dispatch => ({
    updateProject: project => dispatch(updateProject(project))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectEditForm);
