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
                <Title>{`${this.props.contentType} List`}</Title>
                <ThumbnailList
                    figures={this.props.contents.filter(content => content.figure).map(content => content.figure)}
                    contentType={this.props.contentType}
                    size={this.props.size}
                    index={this.props.index}
                    isEditable={this.props.isEditable}
                    onClick={this.props.handleThumbnailClick}
                    onThumbnailDeleteButtonClick={this.props.handleThumbnailDeleteButtonClick}
                />
            </Root>
        );
    }
}

export const mapStateToProps = state => ({
    project: state.player.project,
    contentType: state.player.contentType
});

ImageSelector.propTypes = {
    project: PropTypes.object,
    contents: PropTypes.array,
    contentType: PropTypes.string,
    handleThumbnailClick: PropTypes.func,
    handleThumbnailDeleteButtonClick: PropTypes.func,
    size: PropTypes.string,
    index: PropTypes.number,
    isEditable: PropTypes.bool
};

export default connect(mapStateToProps, null)(ImageSelector);
