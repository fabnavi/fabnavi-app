import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = () => {
        };
    }

    render () {
        return (
            <div className="menu-action search-bar">
                <form>
                    <input id="search-box"/>
                    <span className="search-icon">
                        <img src="./images/search_icon.png" />
                    </span>
                </form>
            </div>
        );
    }
}
