import React from 'react';
import PropTypes from 'prop-types';

import ProjectElement from '../components/ProjectElement';

export default class ShowingResults extends React.Component {
    render() {
        const data = this.props.data;
        const selector = this.props.selector;
        return (
            <div>
                {data.map((project, index) => {
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
    data: PropTypes.arrayOf(PropTypes.object),
    selector: PropTypes.object
};
