import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Debug from 'debug';
import ReactModal from 'react-modal';

import { changeProjectListPage, closeDeleteConfirmation, deleteProject, confirmDeleteProject } from '../actions/manager';
import Paginator from '../components/Paginator.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { colors, spaces } from '../stylesheets/config.js';

const debug = Debug('fabnavi:jsx:ProjectList');

const modalStyles = {
    content : {
        top                   : '20%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-20%',
        transform             : 'translate(-50%, -50%)'
    }
};

class ProjectList extends React.Component {

    componentWillMount() {
        ReactModal.setAppElement('body');
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedId: null
        };
        this.changePage = (page) => {
            this.props.changePage(page);
            this.setState({ selectedId: null });
        }
        this.toggleMenu = (id) => () => {
            if(id === this.state.selectedId) {
                this.setState({ selectedId: null });
            } else {
                this.setState({ selectedId: id });
            }
        }
        this.selectMenu = (id, mode) => {
            this.props.selectMenu(id, mode);
        }
        this.closeConfirmation = () => {
            this.props.closeConfirmation();
        }
        this.onDeleteProject = (projectId) => {
            this.props._deleteProject(projectId);
        }
    }

    render() {
        return <div>
            <style jsx>{`
                .projects{
                    margin: auto;
                    width: ${ spaces.solidWidth };
                    color: ${ colors.userNameColor };
                    overflow: hidden;
                }
                h1{
                    font-size: 14px;
                }
            `}</style>
            <div className="projects">
                <Paginator
                    {...this.props}
                    perPage={8}
                    jumpTo={this.changePage}
                    currentUserId={this.props.userId}
                    contents={this.props.projects}>
                    <ProjectCard
                        selectMenuItem={(id, act) => {
                            this.selectMenu(id, act);
                        }}
                        currentUserId={this.props.userId}
                        selectedId={this.state.selectedId}
                        toggleMenu={this.toggleMenu} />
                </Paginator>
            </div>
            {this.props.showDeleteConfirmation ? (
                <ReactModal
                    isOpen={this.props.showDeleteConfirmation}
                    style={modalStyles}
                    onRequestClose={this.closeConfirmation}
                    contentLabel="delete confirmation"
                >
                    <h2>Do you really want to delete this project ?</h2>
                    <p> project number is {this.props.targetProject}</p>
                    <button onClick={this.closeConfirmation}>close</button>
                    <a onClick={() => {
                        this.onDeleteProject(this.props.targetProject)
                    } }>delete</a>
                </ReactModal>
            ) : (
                <span></span>
            )}
        </div>
    }
}

ProjectList.propTypes = {
    projects: PropTypes.shape({
        byId: PropTypes.object,
        allIds: PropTypes.arrayOf(PropTypes.number)
    }),
    isFetching: PropTypes.bool,
    userId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    route: PropTypes.shape({
        path: PropTypes.string
    }),
    selectMenu: PropTypes.func,
    changePage: PropTypes.func,
    targetProject: PropTypes.number,
    showDeleteConfirmation: PropTypes.bool,
    closeConfirmation: PropTypes.func,
    _deleteProject: PropTypes.func
};

const mapStateToProps = (state) => (
    {
        projects: state.manager.projects,
        targetProject: state.modals.targetProject,
        filter: state.manager.filter,
        currentPage: state.manager.currentPage,
        userId: state.user.id,
        isFetching: state.manager.isFetching,
        maxPage: state.manager.maxPage,
        showDeleteConfirmation: state.modals.showDeleteConfirmation
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        changePage: (page) => dispatch(changeProjectListPage(page)),
        selectMenu: (projectId, mode) => {
            if(mode === 'delete') {
                dispatch(confirmDeleteProject(projectId));
            } else {
                dispatch(push(`/${mode}/${projectId}`))
            }
        },
        closeConfirmation: () => dispatch(closeDeleteConfirmation()),
        _deleteProject: (id) => dispatch(deleteProject(id))
    }
);


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
