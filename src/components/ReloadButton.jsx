import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

const debug = Debug('fabnavi:jsx:ReloadButton');

class ReloadButton extends Component {

    constructor(props) {
        super(props);
        this.onClick = (event) => {
            event.preventDefault();
            // TODO: ここで，現状の検索クエリを検索するといったようなactionを投げる
            debug('reload button is clicked');
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
};

function mapStateToProps(state) {
    return;
}

function mapDispatchToProps(dispatch) {
    return;
}

export default connect(mapStateToProps, mapDispatchToProps)(ReloadButton);