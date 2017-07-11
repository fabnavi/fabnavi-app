import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import ProjectElement from './ProjectElement';
import PageControl from './PageControl';

const debug = Debug('fabnavi:jsx:AllProjectList');

class AllProjectList extends React.Component {

    constructor(props) {
        super(props);
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
        debug('componentWillReceivePorps currentPage: ', nextProps);
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
        // isFetchingがfalseの後trueになり，そのたびにこの関数が呼び出されるので無限ループする
        if(nextProps.currentPage % 4 === 0) {
            api.getAllProjects(nextProps.requestPage, 24, 0);
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

    componentWillUpdate(nextProps, nextState) {
        // debug('componentWillUpdate', nextProps);
        // debug('componentWillUpdate', nextState);
    }
}

AllProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object),
    isFetching: PropTypes.bool,
    route: PropTypes.shape({
        path: PropTypes.string
    }),
    currentPage: PropTypes.number,
    requestPage: PropTypes.number
}

function mapStateToProps(state) {
    return {
        isFetching: state.manager.isFetching,
        projects: state.manager.projects,
        currentPage: state.manager.currentPage,
        requestPage: state.manager.requestPage
    };
}

export default connect(mapStateToProps)(AllProjectList);
