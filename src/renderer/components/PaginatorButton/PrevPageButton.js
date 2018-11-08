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
        const shouldPrevButton = this.props.mode === 'home' || this.props.mode === 'myprojects';
        return (
            <div>
                {shouldPrevButton &&
                    !isStart && (
                        <StyledPaginatorButton
                            prev
                            onClick={this.prevPage}
                            src={`${assetsPath}/images/PrevButton.png`}
                        />
                    )}
            </div>
        );
    }
}

PrevPageButton.propTypes = {
    prevPage: PropTypes.func,
    currentPage: PropTypes.number,
    mode: PropTypes.string
};

const mapStateToProps = state => ({
    currentPage: state.manager.currentPage,
    mode: state.manager.mode
});

const mapDispatchToProps = dispatch => ({
    prevPage: page => dispatch(changeProjectListPage(page))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrevPageButton);
