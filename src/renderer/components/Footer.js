import React from 'react';
import Debug from 'debug';

import { FooterBorder, FooterStyle } from '../stylesheets/application/Footer';

const debug = Debug('fabnavi:jsx:Footer');

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <FooterStyle>
                    <FooterBorder />
                    <p>fabnavi</p>
                </FooterStyle>
            </div>
        );
    }
}
