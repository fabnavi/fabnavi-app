import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import { changeProjectListPage } from '../actions/manager';
import Paginator from '../components/Paginator';
import ProjectCard from '../components/ProjectCard';

const debug = Debug('fabnavi:jsx:ProjectList');

export class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null
        };
        this.changePage = page => {
            this.props.changePage(page);
            this.setState({ selectedId: null });
        };
    }

    render() {
        return (
            <div>
                <Paginator
                    {...this.props}
                    perPage={8}
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
    targetProject: PropTypes.number
};

const mapStateToProps = state => ({
    projects: state.manager.projects,
    targetProject: state.modals.targetProject,
    filter: state.manager.filter,
    currentPage: state.manager.currentPage,
    userId: state.user.id,
    isFetching: state.manager.isFetching,
    maxPage: state.manager.maxPage
});

const mapDispatchToProps = dispatch => ({
    changePage: page => dispatch(changeProjectListPage(page))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectList);
