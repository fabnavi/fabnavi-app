import React, { Component, PropTypes, createElement } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import Debug from 'debug';
const debug = Debug('fabnavi:components:home');
// routing component
class Home extends Component {
  render() {
    debug(this.props);
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
  debug(state);
  return state;
}
export default connect(mapStateToProps)(Home);
