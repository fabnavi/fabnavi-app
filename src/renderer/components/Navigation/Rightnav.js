import React from 'react';
import Debug from 'debug';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MenuIcon from '../MenuIcon';
import { assetsPath } from '../../utils/assetsUtils';
import { RightFrame } from '../../stylesheets/application/share/Frames';

const debug = Debug('fabnavi:js:RightNav');

const RightNav = props => (
    <div>
        {props.isLoggedIn ? (
            <RightFrame>
                <MenuIcon act="sign_out" src={`${assetsPath}/images/sign-out.png`} />
                <MenuIcon to="/myprojects" src={`https://avatars2.githubusercontent.com/u/${Number(props.Uid)}?v=4`} />
            </RightFrame>
        ) : (
            <MenuIcon act="sign_in" src={`${assetsPath}/images/sign-in.png`} />
        )}
    </div>
);

RightNav.propTypes = {
    isLoggedIn: PropTypes.bool,
    isAdmin: PropTypes.bool,
    isDeveloper: PropTypes.bool,
    Uid: PropTypes.string
};

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    isAdmin: state.user.isAdmin,
    isDeveloper: state.user.isDeveloper,
    Uid: state.user.credential.Uid
});

export default connect(mapStateToProps)(RightNav);
