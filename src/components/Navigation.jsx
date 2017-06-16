import React from 'react';
import Debug from 'debug';
import { connect } from 'react-redux';

import MenuIcon from './MenuIcon';

const debug = Debug('fabnavi:jsx:Navigation');

class Navigation extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("render nav", MenuIcon);
    const menu = this.props.user.isLoggedIn ? (
      <div className="menu" >
        <MenuIcon to="/" src="/images/kaffcop_icon/fab_home.png" />
        <MenuIcon to="myprojects" src="/images/kaffcop_icon/fab_mypro.png"/>
        <MenuIcon act="sign_out" src="/images/kaffcop_icon/fab_out.png" />
      </div>
    ) : (
      <div className="menu" >
        <MenuIcon to="/" src="/images/kaffcop_icon/fab_home.png" />
        <MenuIcon act="sign_in" src="/images/kaffcop_icon/fab_in.png" />
      </div>
    );

    return (
      <div className="header">
      header: あとでなおして
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Navigation);

