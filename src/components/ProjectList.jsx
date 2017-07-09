import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import Pagination from '../components/Pagination.jsx';
import ShowingResults from '../components/ShowingResults.jsx';

const debug = Debug('fabnavi:jsx:ProjectList');

class ProjectList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="projects">
                <Pagination contents={this.props.projects}>
                    <ShowingResults />
                </Pagination>
            </div>
        );
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
        if(this.props.match.path === 'myprojects') {
            api.getOwnProjects();
        } else {
            api.getAllProjects();
        }
    }
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object),
    selector: PropTypes.object,
    isFetching: PropTypes.bool,
    route: PropTypes.shape({
        path: PropTypes.string
    }),
    select: PropTypes.func
};

function mapStateToProps(state) {
    return {
        projects: state.manager.projects,
    };
}

export default connect(mapStateToProps)(ProjectList);
