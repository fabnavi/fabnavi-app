import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { PaginatorFrame, PaginatorButton } from '../stylesheets/application/paginator/Paginator';
import { Frame } from '../stylesheets/application/Frame';
import CardList from '../stylesheets/application/ProjectIndex/StyledCardList';

const debug = Debug('fabnavi:jsx:Paginator');

export default class Paginator extends React.Component {
    constructor(props) {
        super(props);
        this.next = () => this.props.jumpTo(this.props.currentPage + 1);
        this.prev = () => this.props.jumpTo(this.props.currentPage - 1);
        this.jumpTo = page => () => this.props.jumpTo(page);
    }

    render() {
        const{ filter, isFetching, maxPage, perPage, currentPage, currentUserId } = this.props;
        const contents = this.props.contents.allIds
            .filter(id => {
                if(filter === 'all') {
                    return true;
                } else if(filter === 'myOwn') {
                    return this.props.contents.byId[id].user.id == currentUserId;
                }
                debug(`invalid state.manager.filter: ${filter}, check state, reducer and actionCreator`);
                return false;
            })
            .slice(currentPage * perPage, (currentPage + 1) * perPage)
            .map(id => this.props.contents.byId[id]);
        let page = null;
        const pageMax = currentPage + 5;
        if(isFetching && contents.length === 0) {
            page = <div>loading projects....</div>;
        } else if(!isFetching && contents.length === 0) {
            page = <div>not found</div>;
        } else {
            page = (
                <CardList>
                    {contents.map(content =>
                        React.cloneElement(this.props.children, {
                            ...content,
                            key: content.id
                        })
                    )}
                </CardList>
            );
        }
        const isEnd = contents.length !== perPage;
        const isStart = currentPage == 0;
        const PaginatorInterface = (
            <PaginatorFrame>
                {isStart ? (
                    <PaginatorButton> &lt; prev </PaginatorButton>
                ) : (
                    <PaginatorButton onClick={this.prev} button="prev">
                        &lt; prev
                    </PaginatorButton>
                )}
                {isEnd ? (
                    <PaginatorButton> next &gt; </PaginatorButton>
                ) : (
                    <PaginatorButton onClick={this.next} button="next">
                        next &gt;
                    </PaginatorButton>
                )}
            </PaginatorFrame>
        );

        return (
            <Frame>
                <div>
                    <div>{page}</div>
                    <div>{PaginatorInterface}</div>
                </div>
            </Frame>
        );
    }
}

Paginator.propTypes = {
    contents: PropTypes.shape({
        byId: PropTypes.object,
        allIds: PropTypes.arrayOf(PropTypes.number)
    }),
    filter: PropTypes.string,
    currentPage: PropTypes.number,
    perPage: PropTypes.number,
    jumpTo: PropTypes.func,
    isFetching: PropTypes.bool,
    maxPage: PropTypes.number
};
