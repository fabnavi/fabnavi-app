import React from 'react';
import { Rect, Group } from 'react-konva';

export default class DragCircle extends React.Component {
    constructor(props) {
        super(props);

        this.changeSize = () => {
            const rect = this.refs.rect;
            rect.to({
                scaleX: Math.random() + 0.8,
                scaleY: Math.random() + 0.8,
                duration: 0.2
            });
        };
    }

    render() {
        return (
            <Group>
                <Rect
                    ref="rect"
                    width={50}
                    height={50}
                    fill="green"
                    draggable="true"
                    onDragEnd={this.changeSize}
                    onDragStart={this.changeSize}
                />
            </Group>
        );
    }
}
