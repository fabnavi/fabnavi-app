import React from 'react';
import PropTypes from 'prop-types';

import ProjectElement from '../components/ProjectElement';

export default class ShowingResults extends React.Component {
    render() {
        const contents = this.props.contents;
        const selector = this.props.selector;
        return (
            <div>
                {contents.map((project, index) => {
                    return (
                        <ProjectElement
                            key={index}
                            project={project}
                            isSelected={selector.index == index}
                            isOpenMenu={selector.index == index && selector.openMenu}
                            menuIndex={selector.menuIndex}
                            menuType={selector.menuType} />
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
