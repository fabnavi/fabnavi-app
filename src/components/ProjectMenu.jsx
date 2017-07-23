import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

const debug = Debug('fabnavi:jsx:ProjectMenu');

export default class ProjectMenu extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <style jsx>{`
                    div.actions {
                        position:absolute;
                        top: 0px;
                        left:0px;
                        padding:0px;
                        margin:0px;
                        width: 250px;
                        height:0px;
                    }
                `}</style>
                <div className="actions">
                    {this.props.isOwn ?
                        <div>
                            <MenuItem actionName="play" className="menu5" onClick={this.props.selectItem} />
                            <MenuItem actionName="detail" className="menu5" onClick={this.props.selectItem} />
                            <MenuItem actionName="edit" className="menu5" onClick={this.props.selectItem} />
                            <MenuItem actionName="delete" className="menu4" onClick={this.props.selectItem} />
                        </div> :
                        <div>
                            <MenuItem actionName="play" className="menu1" onClick={this.props.selectItem} />
                            <MenuItem actionName="detail" className="menu2" onClick={this.props.selectItem} />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const MenuItem = ({ actionName, className, onClick }) =>
    <div>
        <style jsx>{`
            .menu2 {
                height: 140/2px;
            }
            .menu3 {
                height: 140/3px;
            }
            .menu4 {
                height: 140/4px;
            }
            .menu5 {
                height: 140/5px;
            }
            .action-box{
                borderRadius: 5px 5px 0px 0px;
            }
            .action-box::after p{
                margin-top: -7px;
            }
            .action-box::after img {
                width: 27 * 0.8px;
                margin:  27 * 0.1px;
                margin-bottom: -4px;
            }
            .action-box::after span {
                margin-top:2px;
            }
            .action-box::after{
                background-color: rgba(54, 48, 48, 0.8);
                padding-top: 5px;
            }
        `}</style>
        <li className="action-box action"
            onClick={onClick(actionName)}>
            <div className={className}>
                <img src={`./images/p_${actionName}.png`} />
                {actionName}
            </div>
        </li>
    </div>;


ProjectMenu.propTypes = {
    isOwn: PropTypes.bool,
    selectItem: PropTypes.func
}