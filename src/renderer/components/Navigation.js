import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';

import MenuIcon from './MenuIcon';
import SearchBar from './SearchBar';
import ReloadButton from './ReloadButton';
import HostSelector from './HostSelector';

import { NavFrame, LeftNav, Logo, RightNav } from '../stylesheets/application/ProjectIndex/StyledNavigation';

const debug = Debug('fabnavi:jsx:Navigation');
import { assetsPath } from '../utils/assetsUtils';

const Navigation = props => (
    <div>
        <NavFrame>
            <LeftNav>
                <MenuIcon to="/" logo={true} src={`${assetsPath}/images/logo.png`} />
                <SearchBar />
                <ReloadButton />
                <MenuIcon to="/help" help src={`${assetsPath}/images/help.png`} />
            </LeftNav>
            {props.isLoggedIn ? (
                <RightNav>
                    <MenuIcon act="sign_out" src={`${assetsPath}/images/sign-out.png`} />
                    <MenuIcon to="/myprojects" src={`${assetsPath}/images/fabnavi.png`} />
                    {props.isAdmin || props.isDeveloper ? <HostSelector /> : null}
                </RightNav>
            ) : (
                <RightNav>
                    <MenuIcon act="sign_in" src={`${assetsPath}/images/sign-in.png`} />
                </RightNav>
            )}
        </NavFrame>
    </div>
);

Navigation.propTypes = {
    isLoggedIn: PropTypes.bool,
    isAdmin: PropTypes.bool,
    isDeveloper: PropTypes.bool
};

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    isAdmin: state.user.isAdmin,
    isDeveloper: state.user.isDeveloper
});

export default connect(mapStateToProps)(Navigation);
