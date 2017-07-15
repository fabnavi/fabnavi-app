import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { changeProjectListPage } from '../actions/manager';
import Paginator from '../components/Paginator.jsx';
import ProjectCard from '../components/ProjectCard.jsx';

const debug = Debug('fabnavi:jsx:ProjectList');

class ProjectList extends React.Component {

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
    }

    render() {
        return (
            <div className="projects">
              ProjectList
                <Paginator
                    {...this.props}
                    perPage={8}
                    jumpTo={this.changePage}
                    contents={this.props.projects}>
                    <ProjectCard
                        selectMenuItem={(id, act) => {
                            console.log('id', id);
                            console.log('act', act);
                        }}
                        currentUserId={this.props.userId}
                        selectedId={this.state.selectedId}
                        toggleMenu={this.toggleMenu} />
                </Paginator>
            </div>
        );
    }
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object),
    isFetching: PropTypes.bool,
    route: PropTypes.shape({
        path: PropTypes.string
    }),
};

const mapStateToProps = (state) => {
    return {
        projects: state.manager.projects,
        currentPage: state.manager.currentPage,
        userId: state.user.id,
        isFetching: state.manager.isFetching,
        maxPage: state.manager.maxPage
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => dispatch(changeProjectListPage(page))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
