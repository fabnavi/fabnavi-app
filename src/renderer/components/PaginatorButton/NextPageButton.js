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
        // TODO:#299: プロジェクト一覧で、これ以上プロジェクトがなければNextButtonを表示しない
        const isProjectListMode = ['home', 'myprojects'].includes(this.props.mode);
        return (
            <div>
                {isProjectListMode && (
                    <StyledPaginatorButton next onClick={this.nextPage} src={`${assetsPath}/images/NextButton.png`} />
                )}
            </div>
        );
    }
}

NextPageButton.propTypes = {
    projects: PropTypes.shape({
        byId: PropTypes.object,
        allIds: PropTypes.arrayOf(PropTypes.number)
    }),
    nextPage: PropTypes.func,
    currentPage: PropTypes.number,
    mode: PropTypes.string
};

const mapStateToProps = state => ({
    projects: state.manager.projects,
    currentPage: state.manager.currentPage,
    mode: state.manager.mode
});

const mapDispatchToProps = dispatch => ({
    nextPage: page => dispatch(changeProjectListPage(page))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NextPageButton);
