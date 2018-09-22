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
        // 以前とは違うProps なので，コメントアウトしないとコンパイルされません
        // const{ filter, isFetching, maxPage, perPage, currentPage, currentUserId } = this.props;
        // const contents = this.props.contents.allIds
        //     .filter(id => {
        //         switch(filter) {
        //             case 'all':
        //                 return true;
        //             case 'myOwn':
        //                 return this.props.contents.byId[id].user.id == currentUserId;
        //             default:
        //                 debug(`invalid state.manager.filter: ${filter}, check state, reducer and actionCreator`);
        //                 return false;
        //         }
        //     })
        //     .slice(currentPage * perPage, (currentPage + 1) * perPage)
        //     .map(id => this.props.contents.byId[id]);
        // TODO: isEndのロジックがおかしいので修正
        // const isEnd = contents.length !== perPage;
        return (
            <div>
                {/* {!isEnd && (
                    <StyledPaginatorButton next onClick={this.nextPage} src={`${assetsPath}/images/NextButton.png`} />
                )} */}
                <StyledPaginatorButton next onClick={this.nextPage} src={`${assetsPath}/images/NextButton.png`} />
            </div>
        )
    }
}

NextPageButton.propTypes = {
    projects: PropTypes.shape({
        byId: PropTypes.object,
        allIds: PropTypes.arrayOf(PropTypes.number)
    }),
    nextPage: PropTypes.func,
    currentPage: PropTypes.number
};

const mapStateToProps = state => ({
    projects: state.manager.projects,
    currentPage: state.manager.currentPage
});

const mapDispatchToProps = dispatch => ({
    nextPage: page => dispatch(changeProjectListPage(page))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NextPageButton);
