import React from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';

export default class Colorbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'green'
        };

        this.handleClick = () => {
            this.setState({
                color: Konva.Util.getRandomColor()
            });
        };
    }

    render() {
        return (
            <Rect
                x={40}
                y={60}
                width={100}
                height={80}
                fill={this.state.color}
                shadowBlur={5}
                onClick={this.handleClick}
            />
        );
    }
}
