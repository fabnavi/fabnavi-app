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
                margin-left: -470px;
            }
            .left-side {
                display: flex;
                flex-direction: row;
                margin: auto;
            }
            .logo {
                width: 35%;
                padding: 0px;
                margin: 0px;
            }
            img {
                padding-top: 20px;
                width: 200px;
                height: 100%;
            }
            hr {
                width: 85%;
                border: 0;
                border-bottom: 2px solid #3BA3FE;
                background: #fff;
            }
            .right-side {
                display: flex;
                flex-directon: row;
                margin-top: 40px;
                margin-right: -480px;
            }
            .middle-menu {
                display: flex;
                flex-direction: row;
                justify-content: center;
                margin-top: 35px;
                margin-botton: 20px;
            }
            .middle-icon {
                margin-left: 20px;
                margin-right: 20px;
            }
        `}</style>
        <nav>
            <div className="left-side">
                <Link className="logo" to="/">
                    <img className="logo" src={`${assetsPath}/images/logo.png`} />
                </Link>
                <SearchBar />
            </div>
            {props.isLoggedIn ? (
                <div className="right-side" id="menu">
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
                        act="sign_in"
                        src={`${assetsPath}/images/sign-in.png`}
                    />
                </div>
            )}
        </nav>
        <hr />
        <div className="middle-menu">
            <MenuIcon
                className="middle-icon"
                to="/help"
                src={`${assetsPath}/images/help.png`}
            />
            <ReloadButton />
            <MenuIcon
                className="middle-icon"
                to="/workspace"
                src={`${assetsPath}/images/working-mode.png`}
            />
        </div>
    </div>
);

Navigation.propTypes = {
    isLoggedIn: PropTypes.bool
};

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(Navigation);
