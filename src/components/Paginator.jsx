import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

const debug = Debug('fabnavi:jsx:Paginator');

export default class Paginator extends React.Component {

    constructor(props) {
        super(props);
        this.next = () => this.props.jumpTo(this.props.currentPage + 1);
        this.prev = () => this.props.jumpTo(this.props.currentPage - 1);
        this.jumpTo = (page) => () => this.props.jumpTo(page);
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
            page = <div className="contents">{contents.map(content =>
                React.cloneElement(this.props.children, {
                    ...content,
                    key: content.id
                })
            )}
            <style jsx>{`
                .contents {
                    display: flex;
                    flex-wrap: wrap;
                }
            `}</style>
            </div>;
        }
        const isEnd = contents.length !== perPage;
        const isStart = currentPage == 0;
        return <div>
            <style jsx>{`
                .controls{
                    width: 100%;
                    padding-left: 315px;
                    font-size: 20px;
                    display: flex;
                }
                li{
                    margin-left: 120px;
                    height: 20px;
                    margin-right: 2vw;
                    padding: 5px;
                    list-style-type: none;
                }
                .active{
                    border: red 1px solid;
                }
                .contents {
                    display: flex;
                    flex-wrap: wrap;
                }
                .prev-button{
                    margin-right: 120px;
                    cursor: pointer;
                    height: 20px;
                    margin-right: 2vw;
                    padding: 5px;
                    list-style-type: none;
                    background-color: #e4e4e4;
                }
                .next-button{
                    margin-left: 120px;
                    cursor: pointer;
                    height: 20px;
                    margin-right: 2vw;
                    padding: 5px;
                    list-style-type: none;
                    background-color: #e4e4e4;
                }
                .prev-button:hover{
                    background-color: gray;
                }
                .next-button:hover{
                    background-color: gray;
                }
            `}</style>
            <ul className="controls">
                {isStart ? <li> &lt; prev </li> : <li onClick={this.prev} className="prev-button"> &lt; prev </li>}
                {isEnd ? <li> next &gt; </li> : <li onClick={this.next} className="next-button"> next &gt; </li>}
            </ul>
            {page}
            <ul className="controls">
                {isStart ? <li> &lt; prev </li> : <li onClick={this.prev} className="prev-button"> &lt; prev </li>}
                {isEnd ? <li> next &gt; </li> : <li onClick={this.next} className="next-button"> next &gt; </li>}
            </ul>
        </div>
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
