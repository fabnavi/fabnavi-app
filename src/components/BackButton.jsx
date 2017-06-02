import { Component } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Debug from 'debug';

const debug = Debug('fabnavi:components:backbutton');

class BackButton extends Component {
  render() {
    return (
      <div>
        <p onClick={this.props.back}>Back Button</p>
      </div>
    );
  }
}

function mapToStateProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    back: () => {
      dispatch(goBack())
    }
  }
}

export default connect(mapToStateProps, mapDispatchToProps)(BackButton);
