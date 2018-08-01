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

class ImageSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}
    componentWillUnmount() {}

    render() {
        return (
            <Root>
                <Title>Project Images</Title>
                <ThumbnailList
                    figures={this.props.contents.filter(content => content.figure).map(content => content.figure)}
                    onClick={this.props.handleThumbnailClick}
                />
            </Root>
        );
    }
}

const mapStateToProps = state => ({
    project: state.player.project
});

ImageSelector.propTypes = {
    project: PropTypes.object,
    contents: PropTypes.array,
    handleThumbnailClick: PropTypes.func,
};

export default connect(mapStateToProps)(ImageSelector);
