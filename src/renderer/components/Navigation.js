import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';

import MenuIcon from './MenuIcon';
import SearchBar from './SearchBar';
import ReloadButton from './ReloadButton';
import HostSelector from './HostSelector';

import { NavigationLayout, LeftNav, RightNav, NavBorder } from '../stylesheets/application/NavigationStyle';

const debug = Debug('fabnavi:jsx:Navigation');
import { assetsPath } from '../utils/assetsUtils';

export const Navigation = props => (
    <div>
        <NavigationLayout>
            <LeftNav>
                <MenuIcon to="/" logo={true} src={`${assetsPath}/images/logo.png`} />
                <SearchBar />
            </LeftNav>
            {props.isLoggedIn ? (
                <RightNav>
                    <MenuIcon to="/help" src={`${assetsPath}/images/help.png`} />
                    <ReloadButton />
                    <MenuIcon to="/workspace" src={`${assetsPath}/images/working-mode.png`} />
                    <MenuIcon act="sign_out" src={`${assetsPath}/images/sign-out.png`} />
                    <MenuIcon to="/myprojects" src={`${assetsPath}/images/fabnavi.png`} />
                    {props.isAdmin || props.isDeveloper ? <HostSelector /> : null}
                </RightNav>
            ) : (
                <RightNav>
                    <MenuIcon to="/help" src={`${assetsPath}/images/help.png`} />
                    <ReloadButton />
                    <MenuIcon to="/workspace" src={`${assetsPath}/images/working-mode.png`} />
                    <MenuIcon act="sign_in" src={`${assetsPath}/images/sign-in.png`} />
                </RightNav>
            )}
        </NavigationLayout>
        <NavBorder />
    </div>
);

Navigation.propTypes = {
    isLoggedIn: PropTypes.bool,
    isAdmin: PropTypes.bool,
    isDeveloper: PropTypes.bool
};

export const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    isAdmin: state.user.isAdmin,
    isDeveloper: state.user.isDeveloper
});

export default connect(mapStateToProps)(Navigation);
