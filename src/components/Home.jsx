import React, { Component, PropTypes, createElement } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import Debug from 'debug';
const debug = Debug('fabnavi:components:home');

class Home extends Component {
  render() {
    return (
      createElement('div', { className: 'home-header' },
        createElement('h1', null, `hello ${this.props.user}`)
      )
    );
  }
}

const styles = {
  base: {

  },
  list: {

  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Home);
