import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { Group, Text } from 'react-konva';

const debug = Debug('fabnavi:js:ProjectFlow');

export default class ProjectFlow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        debug('prop project: ', this.props.project);
        const project = this.props.project;
        const w = window.innerWidth;
        const h = window.innerHeight;
        return (
            <Group>
                <Text x={w / 2} h={h / 4} fontSize={50} text={`これは${project.name}だよ`} />
                <Text x={w / 2} h={h / 2} fontSize={20} text="テスト用" />
            </Group>
        );
    }
}
