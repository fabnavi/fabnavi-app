import React, {Component, PropTypes, createElement} from 'react';
import Radium from 'radium';

// routing component
export default class Home extends Component {
  render(){
    return (
      createElement('div', {className: 'home-header'}, 
        createElement('h1', null, 'hello')
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
