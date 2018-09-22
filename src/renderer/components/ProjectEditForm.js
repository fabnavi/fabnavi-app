import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { connect } from 'react-redux';
import { debounce } from 'throttle-debounce';

import { updateProject } from '../actions/manager';

import Player from './Player';
import CaptionsField from './ProjectEditForm/CaptionsField';

import { EditPage, PageTitle, EditCaption, InputTitle, InputPrivate, DescriptionFieldWrapper, DescriptionField, SaveButton, EditTarget } from '../stylesheets/application/ProjectEditForm';

const debug = Debug('fabnavi:jsx:ProjectEditForm');

export class ProjectEditForm extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = e => {
            e.preventDefault();
            this.props.updateProject(
                Object.assign({}, this.props.project, {
                    name: this.state.name,
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
            this.setState({ private: e.target.value });
        };

        this.handleDescriptionChange = e => {
            this.setState({ description: e.target.value });
        };

        this.changeCaptions = debounce(500, this.changeCaptions);

        this.onAddCaptionButtonClick = e => {
            e.preventDefault();
            const index = parseInt(e.target.dataset.index, 10);
            if(!this.state.figures) return;
            const currentTime = this.player.getWrappedInstance().getCurrentTime();
            this.setState({
                figures: this.state.figures.map((figure, i) => {
                    if(i !== index) return figure;
                    figure.captions.push({
                        id: null,
                        start_sec: currentTime,
                        end_sec: currentTime,
                        text: ''
                    });
                    return figure;
                })
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
                figure.captions[captionIndex][name] = isNaN(e.target.valueAsNumber) ? 0 : parseInt(e.target.valueAsNumber, 10) / 1000;
            }
            return figure;
        });
        this.setState({ figures: figures });
        this.updatePlayer(figures);
    }

    handleThumbnailDeleteButtonClick(e) {
        this.changeFigureState(e.nativeEvent);
    }

    changeFigureState(e) {
        const thumbnail = e.target.parentNode;
        const figureIndex = parseInt(thumbnail.dataset.index, 10);
        const figures = this.state.figures.map((figure, i) => {
            if(i !== figureIndex) return figure;
            figure._destroy = !figure._destroy;
            return figure;
        });
        this.setState({ figures: figures });
    }

    componentWillReceiveProps(props) {
        if(props.project !== null) {
            this.setState({
                name: props.project.name,
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
                <EditPage>
                    <PageTitle>Project Editor</PageTitle>
                    {project && project.content ? (
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <EditTarget>Project Name</EditTarget>
                                <InputTitle
                                    onChange={this.handleNameChange}
                                    value={this.state.name}
                                    type="text"
                                />
                            </div>
                            <div>
                                <EditTarget>Privacy Settings</EditTarget>
                                <div>
                                    <InputPrivate
                                        onChange={this.handlePublishStatusChange}
                                        type="radio"
                                        value={true}
                                        name="private"
                                        defaultChecked={project.private}
                                    />
                                    <label>This project is <span style={{ textDecoration: 'underline' }}>Private</span>. Only you can see this project.</label>
                                </div>
                                <div>
                                    <InputPrivate
                                        onChange={this.handlePublishStatusChange}
                                        type="radio"
                                        value={false}
                                        name="private"
                                        defaultChecked={!project.private}
                                    />
                                    <label>This project is <span style={{ textDecoration: 'underline' }}>Public</span>. Anyone can see this project.</label>
                                </div>
                            </div>
                            <EditCaption>
                                <Player
                                    project={this.state.project}
                                    size="small"
                                    isEditable={true}
                                    handleThumbnailDeleteButtonClick={this.handleThumbnailDeleteButtonClick.bind(this)}
                                    ref={instance => (this.player = instance)}
                                />
                                <CaptionsField
                                    figures={project.content.map(content => content.figure)}
                                    contentType={project.content[0].type === 'Figure::Frame' ? 'movie' : 'photo'}
                                    handleCaptionsChange={this.handlerCaptionsChange.bind(this)}
                                    onAddCaptionButtonClick={this.onAddCaptionButtonClick}
                                />
                            </EditCaption>


                            <DescriptionFieldWrapper>
                                <EditTarget>Description</EditTarget>
                                <DescriptionField
                                    onChange={this.handleDescriptionChange}
                                    value={this.state.description}
                                    rows="10"
                                />
                            </DescriptionFieldWrapper>
                            <SaveButton type="submit" onClick={this.onSubmit}>save</SaveButton>
                        </form>
                    ) : (
                        <div> loading project... </div>
                    )}
                </EditPage>
            </div>
        );
    }
}

ProjectEditForm.propTypes = {
    project: PropTypes.object,
    updateProject: PropTypes.func
};

export const mapStateToProps = state => ({
    project: state.manager.targetProject
});

export const mapDispatchToProps = dispatch => ({
    updateProject: project => dispatch(updateProject(project))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectEditForm);
