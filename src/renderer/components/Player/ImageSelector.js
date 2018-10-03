import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { arrayMove } from 'react-sortable-hoc';

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

    onSortEnd = ({oldIndex, newIndex}) => {
        const figures = this.props.contents.filter(content => content.figure).map(cont => cont.figure)
        const updatedFigures =
            arrayMove(figures, oldIndex, newIndex)
            .map((figure, index) => {
                figure.position = index + 1
                return figure;
            });
        this.props.handleThumbanailOrderChange(updatedFigures);
    }

    render() {
        return (
            <Root>
                <Title>{`${this.props.contentType} List`}</Title>
                <ThumbnailList
                    figures={this.props.contents
                        .filter(content => content.figure)
                        .map(content => content.figure)
                        .sort((fig1, fig2) => fig1.position - fig2.position)}
                    contentType={this.props.contentType}
                    size={this.props.size}
                    currentThumbnailIndex={this.props.index}
                    isEditable={this.props.isEditable}
                    onClick={this.props.handleThumbnailClick}
                    onThumbnailDeleteButtonClick={this.props.handleThumbnailDeleteButtonClick}
                    lockAxis='y'
                    distance={1}
                    onSortEnd={this.onSortEnd}
                    shouldCancelStart={() => !this.props.isEditable}
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
    handleThumbanailOrderChange: PropTypes.func,
    size: PropTypes.string,
    index: PropTypes.number,
    isEditable: PropTypes.bool
};

export default connect(mapStateToProps, null)(ImageSelector);
