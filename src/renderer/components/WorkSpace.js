import React, { Component } from 'react';
import Debug from 'debug';
import { ChromePicker } from 'react-color';

import BackButton from './BackButton';

const debug = Debug('fabnavi:jsx:WorkSpace');

export default class WorkSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spaceColor: '#ffffff'
        };
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate(prevProps, prevState) {
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        const w = screen.width;
        const h = screen.height;
        ctx.clearRect(0, 0, w, h);
        ctx.fillSylte = 'red';
        this.drawSpace({ ctx, x: 0, y: 0, width: w, height: h });
    }

    drawSpace(props) {
        const{ ctx, x, y, width, height } = props;
        debug('color config', this.state.spaceColor);
        ctx.fillStyle = this.state.spaceColor;
        ctx.fillRect(x, y, width, height);
    }

    handleColorChange(obj) {
        debug('color num', obj.hex);
        this.setState({
            spaceColor: String(obj.hex)
        });
    }

    render() {
        return (
            <div>
                <div>
                    <canvas ref="canvas" width={1680} height={1050} />
                    <div className="picker-position">
                        <ChromePicker color={this.state.spaceColor} onChangeComplete={this.handleColorChange} />
                    </div>
                    <BackButton />
                </div>
            </div>
        );
    }
}
