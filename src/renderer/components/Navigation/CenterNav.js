import React from 'react';
import Debug from 'debug';
import { connect } from 'react-redux';

import MenuIcon from '../MenuIcon';
import SearchBar from './SearchBar';
import ReloadButton from '../ReloadButton';
import { assetsPath } from '../../utils/assetsUtils';
import { CenterNavFrame } from '../../stylesheets/application/ProjectIndex/StyledCenterNav';

const debug = Debug('fabnavi:js:LeftNav');

const CenterNav = props => (
    <CenterNavFrame>
        <SearchBar />
        <ReloadButton />
        <MenuIcon to="/help" help src={`${assetsPath}/images/help.png`} />
    </CenterNavFrame>
);

export default CenterNav;
