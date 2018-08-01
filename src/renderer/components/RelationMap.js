import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Stage, Layer, Text } from 'react-konva';
import Debug from 'debug';

import StepInProject from './RelationMapComponents/StepInProject';

const debug = Debug('fabnavi:js:RelationMap');

/**
 * redux state
 * target project - manager
 * related projects - manager
 * project - player
 */

class RelationMap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        debug('target project is: ', this.props.targetProject);
        const project = this.props.targetProject;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const _length = project.content.length;
        return (
            <Stage width={window.innerWidth * 1.5} height={window.innerHeight * 1.5}>
                <Layer>
                    {project.content.map((_content, index) => {
                        return (
                            <StepInProject
                                key={index}
                                order={index}
                                size={_length}
                                src={_content.figure.file.thumb.url}
                            />
                        );
                    })}
                </Layer>
            </Stage>
        );
    }
}

RelationMap.propTypes = {
    targetProject: PropTypes.object,
    relatedProjects: PropTypes.shape({
        byId: PropTypes.object,
        allIds: PropTypes.arrayOf(PropTypes.number)
    })
};

const mapStateToProps = state => ({
    targetProject: state.manager.targetProject,
    relatedProjects: state.manager.relatedProjects
});

export default connect(
    mapStateToProps,
    null
)(RelationMap);
