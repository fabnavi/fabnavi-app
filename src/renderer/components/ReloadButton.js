import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import { assetsPath } from '../utils/assetsUtils';
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
                        width: 50%;
                        margin-left: 17px;
                        margin-right: 20px;
                        margin-top: -15px;
                    }
                    img:hover {
                        border: 1px dashed black;
                    }
                `}</style>
                <div className="reload-button">
                    <a onClick={this.onClick}>
                        <img className="button-image" src={`${assetsPath}/images/update.png`} />
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