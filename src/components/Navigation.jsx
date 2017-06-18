import React from 'react';
import { Link } from 'react-router';
import Debug from 'debug';
import { connect } from 'react-redux';

import MenuIcon from './MenuIcon';

const debug = Debug('fabnavi:jsx:Navigation');

class Navigation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const menu = this.props.user.isLoggedIn ? (
        <div className="menu" >
          <ul>
            <li><MenuIcon to="/" src="./src/images/fab_home.png" width="200px" height="60px"/></li>
            <li><MenuIcon to="myprojects" src="./src/images/fab_mypro.png"/></li>
            <li><MenuIcon act="sign_out" src="./src/images/fab_out.png" /></li>
          </ul>
        </div>
      ) : (
        <div className="menu" >
          <li><MenuIcon to="/" src="./src/images/fab_home.png" /></li><MenuIcon to="/" src="./src/images/fab_home.png" />
          <li><MenuIcon act="sign_in" src="./src/images/fab_in.png" /></li>
        </div>
      );

        return (
          <div className="header">
            <ul className="glonav">
              <Link className="logo" to="/" >
                <img src="./src/images/logo.png" />
              </Link>

              <li>
                {menu}
              </li>
              <li>
                <Link className="help" to="help">
                  help
                </Link>
              </li>
            </ul>
          </div>
        );
    }
  }

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Navigation);

