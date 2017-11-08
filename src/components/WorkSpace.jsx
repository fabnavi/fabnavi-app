import React, { Component } from 'react';
import Debug from 'debug';
import { ChromePicker } from 'react-color';

import BackButton from './BackButton';

const debug = Debug('fabnavi:jsx:WorkSpace');

export default class WorkSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            space: {
                color: '#ffffff'
            },
            border: {
                color: '#ffffff'
            }
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleBorderColorChange = this.handleBorderColorChange.bind(this);
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
        debug('current config', this.state);
        ctx.fillStyle = this.state.space.color;
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = this.state.border.color;
        ctx.strokeRect(x, y, width, height);
    }

    handleColorChange(obj) {
        debug('color num', obj.hex);
        this.setState({
            space: {
                color: String(obj.hex)
            }
        })
    }

    handleBorderColorChange(obj) {
        debug('color num', obj.hex)
        this.setState({
            border: {
                color: String(obj.hex)
            }
        })
    }

    render() {
        return (
            <div>
                <style jsx>{`
                    .picker-position {
                    }
                `}</style>
                <div>
                    <canvas ref="canvas" width={1680} height={1050} />
                    <div className="picker-position"><ChromePicker color={this.state.space.color} onChangeComplete={ this.handleColorChange }/></div>
                    <div className="picker-position"><ChromePicker color={this.state.border.color} onChangeComplete={ this.handleBorderColorChange }/></div>
                    <BackButton />
                </div>
            </div>
        );
    }
}