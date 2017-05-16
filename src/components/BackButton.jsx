import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Debug from 'debug';

const debug = Debug('fabnavi:components:backbutton');

class BackButton extends Component {
    render(){
        debug(this.props);
        // TODO: 後でStyleの変更など  
        return (
          <div>
              <p onClick={this.props.back}>Back Button</p>
          </div>  
        );
    }
}

function mapToStateProps(state){
    debug(state);
    return state;
}

// これはstore.dispatch()
function mapDispatchToProps(dispatch){
    return {
        back: () => {
            dispatch(goBack())
        }
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(BackButton);