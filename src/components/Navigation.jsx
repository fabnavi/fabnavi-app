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
        const menu = this.props.isLoggedIn ? (
            <div className="menu" >
                <ul>
                    <li><MenuIcon to="/" src="./images/home.png" /></li>
                    <li><MenuIcon to="myprojects" src="./images/myproject.png"/></li>
                    <li><MenuIcon act="sign_out" src="./images/signout.png" /></li>
                    <li><MenuIcon className="help" to="/help" src="./images/help.png" /></li>
                    <li><UpdateButton/></li>
                    <li><BackButton /></li>
                </ul>
            </div>
        ) : (
            <div className="menu" >
                <li><MenuIcon to="/" src="./images/home.png" /></li>
                <li><MenuIcon act="sign_in" src="./images/signin.png" /></li>
                <li><MenuIcon className="help" to="/help" src="./images/help.png" /></li>
                <li><UpdateButton/></li>
                <li><BackButton /></li>
            </div>
        );

        return (
            <div className="header">
                <ul className="glonavi">
                    <Link className="logo" to="/" >
                        <img src="./images/logo.png" />
                    </Link>
                    <li>
                        {menu}
                    </li>
                </ul>
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
