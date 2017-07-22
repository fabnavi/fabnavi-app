import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';

import MenuIcon from './MenuIcon';
import UpdateButton from './UpdateButton';
import BackButton from './BackButton';

const debug = Debug('fabnavi:jsx:Navigation');

class Navigation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const menu = this.props.isLoggedIn ?
            <div>
                <style jsx>{`
                    ul{
                        display: flex;
                        list-style: none;
                    }
                `}</style>
                <ul>
                    <li><BackButton /></li>
                    <li><MenuIcon to="/" src="./images/home.png" /></li>
                    <li><MenuIcon to="myprojects" src="./images/myproject.png"/></li>
                    <li><MenuIcon act="sign_out" src="./images/signout.png" /></li>
                    <li><MenuIcon className="help" to="/help" src="./images/help.png" /></li>
                    <li><UpdateButton/></li>
                </ul>
            </div>
            :
            <ul>
                <li><BackButton /></li>
                <li><MenuIcon to="/" src="./images/home.png" /></li>
                <li><MenuIcon act="sign_in" src="./images/signin.png" /></li>
                <li><MenuIcon className="help" to="/help" src="./images/help.png" /></li>
                <li><UpdateButton/></li>
            </ul>;

        return (
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
                        height: 100%;
                    }
                    hr{
                        width: 100%;
                        border: 0;
                        border-bottom: 1px dashed #ccc;
                        background: #fff;
                    }
                `}</style>
                <nav>
                    <Link className="logo" to="/" >
                        <img src="./images/logo.png" />
                    </Link>
                    <div className="menu">
                        { menu }
                    </div>
                </nav>
                <hr />
            </div>
        );
    }
}

Navigation.propTypes = {
    isLoggedIn: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}

export default connect(mapStateToProps)(Navigation);
