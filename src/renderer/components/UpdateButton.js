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
        };
    }

    render() {
        return (
            <div>
                <style jsx>{`
                    .updatebutton {
                        width: 50px;
                        height: 50px;
                    }
                    img {
                        width: 50px;
                        height: 50px;
                        margin: 10px 0 0 0;
                    }
                    .state-can-update:hover {
                        cursor: pointer;
                        border: 1px dashed black;
                    }
                `}</style>
                <div className="updatebutton">
                    {this.props.canUpdatePage ? (
                        <a onClick={this.onClick} className="state-update">
                            <img
                                className="state-can-update"
                                src={`${assetsPath}/images/update.png`}
                            />
                        </a>
                    ) : (
                        <img
                            className="state-no-update"
                            src={`${assetsPath}/images/no-update.png`}
                        />
                    )}
                </div>
            </div>
        );
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
