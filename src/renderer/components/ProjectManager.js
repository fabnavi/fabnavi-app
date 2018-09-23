import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import LeftNav from './Navigation/LeftNav';
import RightNav from './Navigation/Rightnav';
import CenterNav from './Navigation/CenterNav';
import Footer from './Footer';
import BackButton from './BackButton';
import NextPageButton from './PaginatorButton/NextPageButton';
import PrevPageButton from './PaginatorButton/PrevPageButton';
import ProjectSettings from './ProjectSettings';

import {
    PageFrame,
    LeftFrame,
    CenterFrame,
    RightFrame,
    NavFrame,
    ContentsFrame,
    FooterFrame
} from '../stylesheets/application/share/Frames';

const debug = Debug('fabnavi:jsx:ProjectManager');

export default class ProjectManager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="body" style={{ background: 'white'}}>
                    <PageFrame>
                        <NavFrame>
                            <LeftFrame>
                                <LeftNav />
                            </LeftFrame>
                            <CenterFrame>
                                <CenterNav />
                            </CenterFrame>
                            <RightFrame>
                                <RightNav />
                            </RightFrame>
                        </NavFrame>
                        <ContentsFrame>
                            <LeftFrame>
                                <PrevPageButton />
                                <BackButton />
                            </LeftFrame>
                            <CenterFrame>{this.props.children}</CenterFrame>
                            <RightFrame>
                                <NextPageButton />
                                <ProjectSettings />
                            </RightFrame>
                        </ContentsFrame>
                        <FooterFrame>
                            <LeftFrame>
                                <Footer />
                            </LeftFrame>
                            <CenterFrame>
                                <span />
                            </CenterFrame>
                            <RightFrame>
                                <span />
                            </RightFrame>
                        </FooterFrame>
                    </PageFrame>
                </div>
            </div>
        );
    }
}

ProjectManager.propTypes = {
    children: PropTypes.element
};
