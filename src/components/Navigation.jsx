import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';

import MenuIcon from './MenuIcon';
import UpdateButton from './UpdateButton';
import BackButton from './BackButton';

const debug = Debug('fabnavi:jsx:Navigation');

const Navigation = (props) => (
    <div>
        <style jsx>{`
            nav {
                padding-bottom: 15px;
                height: 50px;
                display: flex;
            }
            .logo {
                display: inline-block;
                padding-top: 20px;
            }
            img {
                padding-top: 20px;
                width: 200px;
                height: 100%;
            }
            hr{
                width: 100%;
                border: 0;
                border-bottom: 1px dashed #ccc;
                background: #fff;
            }
            .menu {
                display: flex;
            }
        `}</style>
        <nav>
            <Link className="logo" to="/" >
                <img src="./images/logo.png" />
            </Link>
            {
                props.isLoggedIn ?
                    <div className="menu">
                        <BackButton />
                        <MenuIcon to="/" src="./images/home-icon.png" />
                        <MenuIcon to="myprojects" src="./images/myproject.png"/>
                        <MenuIcon act="sign_out" src="./images/sign-out.png" />
                        <MenuIcon className="help" to="/help" src="./images/help.png" />
                        <MenuIcon className="working-mode" to="/workspace" src="./images/working-mode.png" />
                        <UpdateButton/>
                    </div> :
                    <div className="menu">
                        <BackButton />
                        <MenuIcon to="/" src="./images/home-icon.png" />
                        <MenuIcon className="help" to="/help" src="./images/help.png" />
                        <MenuIcon act="sign_in" src="./images/sign-in.png" />
                        <MenuIcon className="working-mode" to="/workspace" src="./images/working-mode.png" />
                        <UpdateButton/>
                    </div>
            }
        </nav>
        <hr />
    </div>
);

Navigation.propTypes = {
    isLoggedIn: PropTypes.bool
};

const mapStateToProps = (state) => (
    {
        isLoggedIn: state.user.isLoggedIn
    }
);

export default connect(mapStateToProps)(Navigation);
