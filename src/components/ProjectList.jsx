import React from 'react';
import { connect } from 'react-redux';
import Debug from 'debug';

import ProjectElement from '../components/ProjectElement';

const debug = Debug('fabnavi:jsx:ProjectList');
class ProjectList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const selector = this.props.selector;
    return (
      <div className="projects">
        {this.props.projects.map((project, index) =>
          <ProjectElement
            key={index}
            project={project}
            isSelected={selector.index == index}
            isOpenMenu={selector.index == index && selector.openMenu}
            menuIndex={selector.menuIndex}
            menuType={selector.menuType} /> )
        }
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isFetching) {
      return;
    }
    if(this.props.route['path'] !== nextProps.route['path']) {
      if(nextProps.route['path'] === 'myprojects') {
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
    if(this.props.route['path'] === 'myprojects') {
      api.getOwnProjects();
    } else {
      api.getAllProjects();
    }
  }

  componentDidUpdate() {
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.manager.isFetching,
    projects: state.manager.projects,
    selector: state.manager.selector
  };
}

export default connect(mapStateToProps)(ProjectList);
