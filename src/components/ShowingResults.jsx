import React from 'react';
import PropTypes from 'prop-types';

import ProjectElement from '../components/ProjectElement';

export default class ShowingResults extends React.Component {
    render() {
        const contents = this.props.contents;
        return (
            <div>
                {contents.map((project, index) => {
                    return (
                        <ProjectElement
                            key={index}
                            project={project}
                            isOpenMenu={true} />
                    )
                })}
            </div>
        )
    }
}

ShowingResults.propTypes = {
    contents: PropTypes.arrayOf(PropTypes.object),
    selector: PropTypes.object
};
