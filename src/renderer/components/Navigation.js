import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';

import MenuIcon from './MenuIcon';
import SearchBar from './SearchBar';
import ReloadButton from './ReloadButton';

const debug = Debug('fabnavi:jsx:Navigation');
import { assetsPath } from '../utils/assetsUtils';

const Navigation = props => (
    <div>
        <style jsx>{`
            nav {
                width: 90%;
                padding-top: 25px;
                padding-bottom: 55px;
                height: 50px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .left-side {
                display: flex;
                flex-direction: row;
                margin-left: 120px;
            }
            .logo {
                width: 35%;
                padding: 0px;
                padding-top: 10px;
                margin: 0px;
            }
            img {
                padding-top: 30px;
                width: 200px;
                height: 80px;
            }
            hr {
                width: 85%;
                border: 0;
                border-bottom: 2px solid #3ba3fe;
                background: #fff;
            }
            .right-side {
                display: flex;
                flex-directon: row;
                margin-top: 40px;
                margin-right: -70px;
            }
        `}</style>
        <nav>
            <div className="left-side">
                <Link className="logo" to="/">
                    <img
                        className="logo"
                        src={`${assetsPath}/images/logo.png`}
                    />
                </Link>
                <SearchBar />
            </div>
            {props.isLoggedIn ? (
                <div className="right-side" id="menu">
                    <MenuIcon
                        to="/help"
                        src={`${assetsPath}/images/help.png`}
                    />
                    <ReloadButton />
                    <MenuIcon
                        to="/workspace"
                        src={`${assetsPath}/images/working-mode.png`}
                    />
                    <MenuIcon
                        act="sign_out"
                        src={`${assetsPath}/images/sign-out.png`}
                    />
                    <MenuIcon
                        to="myprojects"
                        src={`${assetsPath}/images/fabnavi.png`}
                    />
                </div>
            ) : (
                <div className="right-side">
                    <MenuIcon
                        to="/help"
                        src={`${assetsPath}/images/help.png`}
                    />
                    <ReloadButton />
                    <MenuIcon
                        to="/workspace"
                        src={`${assetsPath}/images/working-mode.png`}
                    />
                    <MenuIcon
                        act="sign_in"
                        src={`${assetsPath}/images/sign-in.png`}
                    />
                </div>
            )}
        </nav>
        <hr />
    </div>
);

Navigation.propTypes = {
    isLoggedIn: PropTypes.bool
};

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(Navigation);
