import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import Navigation from './Navigation';
import SearchBar from './SearchBar';
import Footer from './Footer';

const debug = Debug('fabnavi:jsx:ProjectManager');
debug(Navigation);

export default class ProjectManager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <style jsx global>{`
                    .body {
                        margin: 0
                    }
                    li {
                        list-style: none;
                    }
                `}</style>
                <div className="body">
                    <div className="header">
                        <Navigation />
                        <SearchBar />
                    </div>
                    {this.props.children}
                    <Footer />
                </div>
            </div>
        );
    }
}

ProjectManager.propTypes = {
    children: PropTypes.element
}
