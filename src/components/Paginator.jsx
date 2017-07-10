import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

const debug = Debug('fabnavi:jsx:Paginator');

export default class Paginator extends React.Component {

  constructor(props){
      super(props);
      this.next = () => this.props.jumpTo(this.props.currentPage + 1);
      this.prev= () => this.props.jumpTo(this.props.currentPage - 1);
      this.jumpTo = (page) => () => this.props.jumpTo(page);
  }

  render() {
      const {isFetching, maxPage, perPage, currentPage} = this.props;
      const contents = this.props.contents.slice(currentPage * perPage, (currentPage + 1) * perPage);
      let page = null;
      let pageMax = currentPage + 5;
      if (isFetching && contents.length === 0) {
          page = <div>loading projects....</div>;
      } else if (!isFetching && contents.length === 0) {
          page = <div>not found</div>;
      } else {
          page = <div>{contents.map(content => 
              React.cloneElement(this.props.children, {
                ...content,
                  key: content.id
              })
          )}</div>;
      }
      const isEnd = contents.length !== perPage;
      const isStart = currentPage == 0;
      return <div>
          <style>{`
            ul.controls {
              display: flex;
            }
            ul.controls > li {
              margin-right: 2vw;
              list-style-type: none;
              border: black 1px solid;
            }
            ul.controls > li.active {
              border: red 1px solid;
            }
          `}</style>
        <ul className="controls">
            {isStart ? null : <li onClick={this.prev}> &lt; </li>}
            {isEnd ? null : <li onClick={this.next}> &gt; </li>}
        </ul>
            {page}
        </div>
    }
}


Paginator.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.object),
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
  jumpTo: PropTypes.func,
  isFetching: PropTypes.bool,
  maxPage: PropTypes.number
};