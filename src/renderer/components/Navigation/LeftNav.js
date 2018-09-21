import React from 'react';
import Debug from 'debug';
import { connect } from 'react-redux';

import MenuIcon from '../MenuIcon';
import { assetsPath } from '../../utils/assetsUtils';

const debug = Debug('fabnavi:js:LeftNav');

const LeftNav = props => (
    <div>
        <MenuIcon to="/" logo={true} src={`${assetsPath}/images/logo.png`} />
    </div>
);

export default LeftNav;
