import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import ProjectElement from './ProjectElement';
import PageControl from './PageControl';
import { initializePrevPageState, initializeNextPageState } from '../actions/manager.js';

const debug = Debug('fabnavi:jsx:AllProjectList');

class AllProjectList extends React.Component {

    constructor(props) {
        super(props);
        this.initializePrevPage = () => {
            this.props.initializePrevPage();
        }
        this.initializeNextPage = () => {
            this.props.initializeNextPage();
        }
    }

    render() {
        const projects = this.props.projects;
        const currentPage = this.props.currentPage;
        const perPage = 8;
        const upperLimit = currentPage * perPage;
        const showingContents = projects.slice((upperLimit - perPage), upperLimit);
        return (
            <div className="projects">
                {showingContents.map((project, index) =>
                    <ProjectElement
                        key={index}
                        project={project}
                        isOpenMenu={true} />
                )}
                <PageControl />
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isFetching) {
            return;
        }
        if(this.props.match.path !== nextProps.match.path) {
            if(nextProps.match.path === 'myprojects') {
                api.getOwnProjects();
            } else {
                api.getAllProjects();
            }
        }
        if(nextProps.currentPage === 1) {
            return;
        }
        if(nextProps.currentPage % 4 === 0 && nextProps.currentPage !== 0 && nextProps.nextPageAction) {
            debug('componentWillReceivePorps next page action: ', nextProps);
            api.getAllProjects(nextProps.requestPage, 24, 0);
            this.initializeNextPage();
        }
        if(nextProps.currentPage === 0 && nextProps.prevPageAction) {
            debug('componentWillReceiveProps prev page action: ', nextProps);
            api.getAllProjects(nextProps.requestPage, 24, 0);
            this.initializePrevPage();
        }
    }

    componentWillMount() {
        if(this.props.projects.length !== 0) {
            return;
        }
        if(this.props.projects.length === 'myprojects') {
            api.getOwnProjects();
        } else {
            api.getAllProjects(this.props.requestPage, 24, 0);
        }
    }
}

AllProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object),
    isFetching: PropTypes.bool,
    route: PropTypes.shape({
        path: PropTypes.string
    }),
    currentPage: PropTypes.number,
    requestPage: PropTypes.number,
    initializePrevPage: PropTypes.func,
    initializeNextPage: PropTypes.func,
    nextPageAction: PropTypes.bool,
    prevPageAction: PropTypes.bool
}

function mapStateToProps(state) {
    return {
        isFetching: state.manager.isFetching,
        projects: state.manager.projects,
        currentPage: state.manager.currentPage,
        requestPage: state.manager.requestPage,
        nextPageAction: state.manager.nextPageAction,
        prevPageAction: state.manager.prevPageAction
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initializePrevPage: () => {
            debug('return initial page prev');
            dispatch(initializePrevPageState());
            // dispatch(goBack());
        },
        initializeNextPage: () => {
            debug('return initial page next');
            dispatch(initializeNextPageState());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProjectList);
