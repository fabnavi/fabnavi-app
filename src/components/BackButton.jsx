import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Debug from 'debug';

const debug = Debug('fabnavi:components:backbutton');

class BackButton extends Component {
    render(){
        debug(this.props);
        return (
          <div>
              <p onClick={this.props.back}>test</p>
          </div>  
        );
    }
}

function mapToStateProps(state){
    debug(state);
    return state;
}

// これはstore.dispatch()です
function mapDispatchToProps(dispatch){
    return {
        back: () => {
            dispatch(goBack())
        }
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(BackButton);