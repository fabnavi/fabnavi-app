import React, { Component } from 'react';
import Debug from 'debug';

import BackButton from './BackButton';
import MainView from '../workspace/MainView';

const debug = Debug('fabnavi:jsx:WorkSpace');

export default class WorkSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
            trigger: false
        }
    }

    render() {
        return (
            <div>
                { this.state.trigger ?
                    <div>{this.state.canvas}</div> :
                    <canvas ref="workcvs"></canvas>
                }
                <BackButton />
            </div>
        );
    }

    componentDidMount() {
        const canvas = this.refs.workcvs;
        const cvs = new MainView(canvas);
        this.setState({
            canvas: cvs,
            trigger: true
        });
    }
}