import React from 'react';
import Debug from 'debug';

import Navigation from './Navigation';
import SearchBar from './SearchBar';
import Footer from './Footer';

const debug = Debug('fabnavi:jsx:ProjectManager');

export default class ProjectManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="body">
        <Navigation />
        <SearchBar />
          {this.props.children}
        <Footer />
      </div>
    );
  }
}