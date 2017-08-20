import React, { Component } from 'react';
import Debug from 'debug';

const debug = Debug('fabnavi:jsx:WorkingMode');

export default class WorkingMode extends Component {
    render() {
        debug('working mode')
        return (
            <div>
                <style jsx>{`
                `}</style>
                hogehgoe
            </div>
        );
    }
}