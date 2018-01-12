import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import { requestSearchProjects } from '../actions/manager';

const debug = Debug('fabnavi:components:searchbar');

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchWord: ''
        };

        this.onClick = (event) => {
            event.preventDefault();
            this.props.searchProjects(this.state.searchWord);
        };

        this.handleWordChange = (event) => {
            this.setState({ searchWord: event.target.value });
        };

        this.handleKeyDown = (event) => {
            const ENTER = 13;
            if(event.keyCode === ENTER) {
                event.preventDefault();
                return;
            }
        }
    }

    render() {
        return (
            <div>
                <style jsx>{`
                    .belt {
                        background-color: white;
                        padding-bottom: 30px;
                        padding-top: 5px;
                        text-align:center;
                    }
                    .search-bar {
                        width: 1200px;
                        position: relative;
                        margin-left: auto;
                        margin-right: auto;
                        padding-top:5px;
                        height: 28px;
                        display:block;
                    }
                    form {
                        right: 0;
                        width: 400px;
                        height: 40px;
                        background-color: white;
                        border-radius: 4px;
                        box-shadow: none;
                        border:solid 1px;
                        color:#CECECE;
                        margin-left: 200px;
                    }
                    input {
                        box-shadow: none;
                        line-height:40px;
                        background: none;
                        border: none;
                        width: 90%;
                        font-size:12pt;
                        float: left;
                        font-style:none;
                        color: #262626;
                    }
                    img {
                        width: 24px;
                        height: 24px;
                        margin: 10px 0 0 0;
                    }
                    img:hover{
                        cursor : pointer;
                        border:1px dashed black;
                    }
                `}</style>
                <section className="belt">
                    <div className="search-bar">
                        <form>
                            <input
                                value={this.state.searchWord}
                                onChange={this.handleWordChange}
                                onKeyDown={this.handleKeyDown}/>
                            <a onClick={this.onClick}>
                                <img src={`${assetsPath}/images/search_icon.png`} />
                            </a>
                        </form>
                    </div>
                </section>
            </div>
        )
    }
}

SearchBar.propTypes = {
    searchProjects: PropTypes.func
}

function mapDispatchToProps(dispatch) {
    return {
        searchProjects: (keyword) => {
            if(keyword === '') {
                return;
            }
            dispatch(requestSearchProjects(keyword));
        }
    }
}

export default connect(null, mapDispatchToProps)(SearchBar);

