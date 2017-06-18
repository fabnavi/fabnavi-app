import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ProjectElement from '../components/ProjectElement';

export default class ShowingResults extends Component {
    render(){
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