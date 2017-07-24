import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
        this.selectMenu = (id, mode) => {
            this.props.selectMenu(id, mode);
        }
    }

    render() {
        debug('props', this.props);
        debug('byId type', typeof this.props.byId);
        return (
            <div className="projects">
                <Paginator
                    {...this.props}
                    perPage={8}
                    jumpTo={this.changePage}
                    ids={this.props.allProjectIds}
                    contents={this.props.byId}>
                    <ProjectCard
                        selectMenuItem={(id, act) => {
                            this.selectMenu(id, act);
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
    allProjectIds: PropTypes.arrayOf(PropTypes.number),
    byId: PropTypes.objectOf(PropTypes.object),
    isFetching: PropTypes.bool,
    userId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    route: PropTypes.shape({
        path: PropTypes.string
    }),
    selectMenu: PropTypes.func,
    changePage: PropTypes.func
};

const mapStateToProps = (state) => (
    {
        allProjectIds: state.manager.projects.allProjectIds,
        byId: state.manager.projects.byId,
        currentPage: state.manager.currentPage,
        userId: state.user.id,
        isFetching: state.manager.isFetching,
        maxPage: state.manager.maxPage
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        changePage: (page) => dispatch(changeProjectListPage(page)),
        selectMenu: (projectId, mode) => dispatch(push(`/${mode}/${projectId}`))
    }
);


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
