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
        return (
            <nav>
                <style jsx>{`
                    nav {
                      height: 50px;
                      display: flex;
                    }
                  .logo {
                    display: inline-block;
                    }
                   img {
                      height: 100%;
                    }
                    .menu {
                      display: flex;
                    }
                `}</style>
                <Link className="logo" to="/" >
                    <img src="./images/logo.png" />
                </Link>
                {this.props.isLoggedIn ?
                    <div className="menu" >
                        <BackButton />
                        <MenuIcon to="/" src="./images/home.png" />
                        <MenuIcon to="myprojects" src="./images/myproject.png"/>
                        <MenuIcon act="sign_out" src="./images/signout.png" />
                        <MenuIcon className="help" to="/help" src="./images/help.png" />
                        <UpdateButton/>
                    </div> :
                    <div className="menu" >
                        <BackButton />
                        <MenuIcon to="/" src="./images/home.png" />
                        <MenuIcon act="sign_in" src="./images/signin.png" />
                        <MenuIcon className="help" to="/help" src="./images/help.png" />
                        <UpdateButton/>
                    </div>}

            </nav>
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
