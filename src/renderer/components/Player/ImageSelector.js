import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import ThumbnailList from './ImageSelector/ThumbnailList';
import {
    Title,
    Root
} from '../../stylesheets/player/ImageSelector';

const debug = Debug('fabnavi:jsx:ImageSelector');

export class ImageSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root>
                <Title>Project Images</Title>
                <ThumbnailList
                    figures={this.props.contents.filter(content => content.figure).map(content => content.figure)}
                    onClick={this.props.handleThumbnailClick}
                    isEditable={this.props.isEditable}
                    onThumbnailDeleteButtonClick={this.props.handleThumbnailDeleteButtonClick}
                />
            </Root>
        );
    }
}

export const mapStateToProps = state => ({
    project: state.player.project
});

ImageSelector.propTypes = {
    project: PropTypes.object,
    contents: PropTypes.array,
    handleThumbnailClick: PropTypes.func,
    handleThumbnailDeleteButtonClick: PropTypes.func,
    isEditable: PropTypes.bool
};

export default connect(mapStateToProps, null)(ImageSelector);
