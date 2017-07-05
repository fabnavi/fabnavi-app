import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import ProjectElement from './ProjectElement';
import PageController from './PageController';

const debug = Debug('fabnavi:jsx:AllProjectList');

class AllProjectList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        const projects = this.props.projects;
        const selector = this.props.selector;
        const currentPage = this.props.currentPage;
        const perPage = this.props.perPage;
        const upperLimit = currentPage * perPage;
        const showingContents = projects.slice((upperLimit - perPage), upperLimit);   
        return (
            <div className="projects">
                {showingContents.map((project, index) =>
                    <ProjectElement
                        key={index}
                        project={project}
                        isSelected={selector.index == index}
                        isOpenMenu={selector.index == index && selector.openMenu}
                        menuIndex={selector.menuIndex}
                        menuType={selector.menuType} />
                )}
                <PageController />
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
    }

    componentWillMount() {
        if(this.props.projects.length !== 0) {
            return;
        }
        if(this.props.projects.length === 'myprojects') {
            api.getOwnProjects();
        } else {
            api.getAllProjects();
        }
    }
    
    // componentWillUpdate(nextProps, nextState) {

    // }
}

AllProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object),
    selector: PropTypes.object,
    isFetching: PropTypes.bool,
    route: PropTypes.shape({
        path: PropTypes.string
    }),
    initialPage: PropTypes.number,
    currentPage: PropTypes.number,
    perPage: PropTypes.number
}

function mapStateToProps(state) {
    return {
        isFetching: state.manager.isFetching,
        projects: state.manager.projects,
        selector: state.manager.selector,
        initialPage: state.manager.initialPage,
        currentPage: state.manager.currentPage,
        perPage: state.manager.perPage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prevPage: () => {
            dispatch({
                type: 'PREV_PROJECTS_PAGE'
            });
        },
        nextPage: () => {
            dispatch({
                type: 'NEXT_PROJECTS_PAGE'
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProjectList);
