import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import { reloadProjects } from '../actions/manager';

const debug = Debug('fabnavi:jsx:ReloadButton');

class ReloadButton extends Component {

    constructor(props) {
        super(props);
        this.onClick = (event) => {
            event.preventDefault();
            this.props.reloadProjects();
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
                    .state-can-update:hover{
                        cursor : pointer;
                        border:1px dashed black;
                    }
                `}</style>
                <div className="reload-button">
                    <a onClick={this.onClick}>
                        この文字列を押したら検索queryでreloadする太郎
                    </a>
                </div>
            </div>
        )
    }
}

ReloadButton.propTypes = {
    reloadProjects: PropTypes.func
};

function mapDispatchToProps(dispatch) {
    return {
        reloadProjects: () => {
            dispatch(reloadProjects());
        }
    }
}

export default connect(null, mapDispatchToProps)(ReloadButton);