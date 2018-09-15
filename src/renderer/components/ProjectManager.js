import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import Navigation from './Navigation';
import LeftNav from './Navigation/LeftNav';
import RightNav from './Navigation/Rightnav';
import CenterNav from './Navigation/CenterNav';

import { PageFrame, LeftFrame, CenterFrame, RightFrame } from '../stylesheets/application/share/Frames';

const debug = Debug('fabnavi:jsx:ProjectManager');
debug(Navigation);

export default class ProjectManager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="body">
                    <PageFrame>
                        <LeftFrame>
                            <LeftNav />
                            <p>back</p>
                        </LeftFrame>
                        <CenterFrame>
                            <CenterNav />
                            {this.props.children}
                            {/* Todo: footerを入れる */}
                        </CenterFrame>
                        <RightFrame>
                            <RightNav />
                        </RightFrame>
                    </PageFrame>
                </div>
            </div>
        );
    }
}

ProjectManager.propTypes = {
    children: PropTypes.element
};
