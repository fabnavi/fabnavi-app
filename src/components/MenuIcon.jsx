import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { push } from 'react-router-redux';

const debug = Debug('fabnavi:jsx:MenuIcon');

const MenuIcon = (props) => {
    const _onClick = () => {
        if(props.hasOwnProperty('to')) {
            props.jump(props.to);
        }
    };
    return (
        <div>
            <style jsx>{`
                img {
                    width: 50px;
                    height: 50px;
                    margin: 10px 0 0 0;
                }
                img:hover{
                    cursor : pointer;
                    border:1px dashed black;
                }
            `}</style>
            <a onClick={_onClick} >
                <img src={props.src} />
            </a>
        </div>
    );
}

MenuIcon.propTypes = {
    jump: PropTypes.func,
    src: PropTypes.string,
    to: PropTypes.string,
    act: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => (
    {
        jump: (path) => {
            dispatch(push(path));
        }
    }
);

export default connect(null, mapDispatchToProps)(MenuIcon);
