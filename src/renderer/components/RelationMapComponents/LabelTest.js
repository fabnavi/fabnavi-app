import React from 'react';
import Debug from 'debug';
import PropTypes from 'prop-types';
import { Label, Tag, Text } from 'react-konva';

export default class LabelTest extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        return (
            <Label x={w / 2} y={h / 2}>
                <Tag
                    fill="black"
                    pointerDirection="down"
                    pointerWidth={10}
                    pointerHeight={10}
                    lineJoin="round"
                    shadowColor="black"
                />
                <Text text="Tooltip pointing down" fontFamily="Calibri" fontSize={18} padding={5} fill="white" />
            </Label>
        );
    }
}
