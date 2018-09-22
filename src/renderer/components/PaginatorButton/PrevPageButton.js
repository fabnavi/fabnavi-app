import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';

import { changeProjectListPage } from '../../actions/manager';
import { StyledPaginatorButton } from '../../stylesheets/application/paginator/Paginator';
import { assetsPath } from '../../utils/assetsUtils';

const debug = Debug('fabnavi:PaginatorButton:PrevButtonPage');

class PrevPageButton extends React.Component {
    constructor(props) {
        super(props);

        this.prevPage = () => {
            this.props.prevPage(this.props.currentPage - 1);
        };
    }

    render() {
        const isStart = this.props.currentPage == 0;
        return (
            <div>
                {!isStart && (
                    <StyledPaginatorButton onClick={this.prevPage} src={`${assetsPath}/images/PrevButton.png`} prev />
                )}
            </div>
        );
    }
}

PrevPageButton.propTypes = {
    prevPage: PropTypes.func,
    currentPage: PropTypes.number
};

const mapStateToProps = state => ({
    currentPage: state.manager.currentPage
});

const mapDispatchToProps = dispatch => ({
    prevPage: page => dispatch(changeProjectListPage(page))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrevPageButton);
