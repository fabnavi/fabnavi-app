import React, { Component, createElement } from 'react';
import Debug from 'debug';

import BackButton from './BackButton';
import MainView from '../workspace/MainView';

const debug = Debug('fabnavi:jsx:WorkSpace');

export default class WorkSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cvs: null
        }
    }

    render() {
        return (
            <div>
                { this.state.cvs }
                <BackButton />
            </div>
        );
    }

    componentDidMount() {
        const canvas = createElement('canvas');
        this.setState({
            cvs: canvas
        })
    }
}