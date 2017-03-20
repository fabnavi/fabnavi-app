import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    render(){
        return (
            <p>Hello World !</p>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);