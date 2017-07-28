import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

const debug = Debug('fabnavi:jsx:UpdateButton');

class UpdateButton extends Component {

    constructor(props) {
        super(props);
        this.onClick = () => {
            api.getAllProjects();
        }
    }

    render() {
        return (
            <div>
                <style jsx>{`
                    img {
                        width: 60%;
                        height: 60%;
                        margin: 10px 0 0 0;
                    }
                    img:hover{
                        cursor : pointer;
                        border:1px dashed black;
                    }
                `}</style>
                <div className="updatebutton">
                    {this.props.canUpdatePage ?
                        <a onClick={this.onClick} className="state-update">
                            <img src="./images/update.png" />
                        </a> :
                        <img className="state-no-update" src="./images/no-update.png" />
                    }
                </div>
            </div>
        )
    }
}

UpdateButton.propTypes = {
    canUpdatePage: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        canUpdatePage: state.manager.canUpdatePage
    };
}

export default connect(mapStateToProps)(UpdateButton);