import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Debug from 'debug';
import ReactModal from 'react-modal';

import { changeProjectListPage, confirmDeleteProject } from '../actions/manager';
import Paginator from '../components/Paginator';
import ProjectCard from '../components/ProjectCard';
import DeleteModal from '../components/DeleteModal';

import { ProjectView } from '../stylesheets/application/ProjectIndex/StyledProjectView';

const debug = Debug('fabnavi:jsx:ProjectList');

class ProjectList extends React.Component {
    componentWillMount() {
        ReactModal.setAppElement('body');
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedId: null
        };
        this.changePage = page => {
            this.props.changePage(page);
            this.setState({ selectedId: null });
        };
        this.toggleMenu = id => () => {
            if(id === this.state.selectedId) {
                this.setState({ selectedId: null });
            } else {
                this.setState({ selectedId: id });
            }
        };
        this.selectMenu = (id, mode) => {
            this.props.selectMenu(id, mode);
        };
    }

    render() {
        return (
            <div>
                <ProjectView>
                    <Paginator
                        {...this.props}
                        perPage={6}
                        jumpTo={this.changePage}
                        currentUserId={this.props.userId}
                        contents={this.props.projects}
                    >
                        <ProjectCard
                            selectMenuItem={(id, act) => {
                                this.selectMenu(id, act);
                            }}
                            currentUserId={this.props.userId}
                            selectedId={this.state.selectedId}
                            toggleMenu={this.toggleMenu}
                        />
                    </Paginator>
                </ProjectView>
                {this.props.showDeleteConfirmation ? <DeleteModal /> : <span />}
            </div>
        );
    }
}

ProjectList.propTypes = {
    projects: PropTypes.shape({
        byId: PropTypes.object,
        allIds: PropTypes.arrayOf(PropTypes.number)
    }),
    isFetching: PropTypes.bool,
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    route: PropTypes.shape({
        path: PropTypes.string
    }),
    selectMenu: PropTypes.func,
    changePage: PropTypes.func,
    targetProject: PropTypes.object,
    showDeleteConfirmation: PropTypes.bool
};

const mapStateToProps = state => ({
    projects: state.manager.projects,
    targetProject: state.modals.targetProject,
    filter: state.manager.filter,
    currentPage: state.manager.currentPage,
    userId: state.user.id,
    isFetching: state.manager.isFetching,
    maxPage: state.manager.maxPage,
    showDeleteConfirmation: state.modals.showDeleteConfirmation
});

const mapDispatchToProps = dispatch => ({
    changePage: page => dispatch(changeProjectListPage(page)),
    selectMenu: (projectId, mode) => {
        if(mode === 'delete') {
            dispatch(confirmDeleteProject(projectId));
        } else {
            dispatch(push(`/${mode}/${projectId}`));
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectList);
