import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { connect } from 'react-redux';

import { changeProjectListPage } from '../../actions/manager';
import { StyledPaginatorButton } from '../../stylesheets/application/paginator/Paginator';
import { assetsPath } from '../../utils/assetsUtils';

const debug = Debug('fabnavi:PaginatorButton:NextButtonPage');

class NextPageButton extends React.Component {
    constructor(props) {
        super(props);

        this.nextPage = () => {
            this.props.nextPage(this.props.currentPage + 1);
        };
    }

    render() {
        return <StyledPaginatorButton onClick={this.nextPage} src={`${assetsPath}/images/NextButton.png`} next />;
                <StyledPaginatorButton next onClick={this.nextPage} src={`${assetsPath}/images/NextButton.png`} />
    }
}

NextPageButton.propTypes = {
    nextPage: PropTypes.func,
    currentPage: PropTypes.number
};

const mapStateToProps = state => ({
    currentPage: state.manager.currentPage
});

const mapDispatchToProps = dispatch => ({
    nextPage: page => dispatch(changeProjectListPage(page))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NextPageButton);
