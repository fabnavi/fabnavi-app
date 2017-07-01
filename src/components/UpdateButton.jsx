import React, { Component } from 'react';
import Debug from 'debug';

const debug = Debug('fabnavi:jsx:UpdateButton');

export default class UpdateButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="updatebutton">
                <a>update buttonだよ！</a>
            </div>
        )
    }
}