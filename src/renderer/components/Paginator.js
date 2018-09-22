import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { Frame } from '../stylesheets/application/Frame';
import CardList from '../stylesheets/application/ProjectIndex/StyledCardList';

const debug = Debug('fabnavi:jsx:Paginator');

export default class Paginator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const{ filter, isFetching, maxPage, perPage, currentPage, currentUserId } = this.props;
        const contents = this.props.contents.allIds
            .filter(id => {
                switch(filter) {
                    case 'all':
                        return true;
                    case 'myOwn':
                        return this.props.contents.byId[id].user.id == currentUserId;
                    default:
                        debug(`invalid state.manager.filter: ${filter}, check state, reducer and actionCreator`);
                        return false;
                }
            })
            .slice(currentPage * perPage, (currentPage + 1) * perPage)
            .map(id => this.props.contents.byId[id]);
        let page = null;
        if(isFetching && contents.length === 0) {
            page = <div>loading projects....</div>;
        } else if(!isFetching && contents.length === 0) {
            page = <div>not found</div>;
        } else {
            page = (
                <CardList>
                    {contents.map((content, index) =>
                        React.cloneElement(this.props.children, {
                            ...content,
                            key: content.id,
                            index: index
                        })
                    )}
                </CardList>
            );
        }

        return <Frame>{page}</Frame>;
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
    isFetching: PropTypes.bool,
    maxPage: PropTypes.number,
    currentUserId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
