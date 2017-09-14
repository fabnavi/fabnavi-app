import React, { Component } from 'react';
import Debug from 'debug';

import BackButton from './BackButton';

const debug = Debug('fabnavi:jsx:WorkSpace');

export default class WorkSpace extends Component {
    render() {
        debug('working mode')
        return (
            <div>
                <style jsx>{`
                `}</style>
                <BackButton />
            </div>
        );
    }
}