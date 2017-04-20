import React from 'react';
import Debug from 'debug';

const debug = Debug('fabnavi:jsx:Footer');

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="belt">
        <hr />
        <p>
          fabnavi
        </p>
      </footer>
    );
  }
}
