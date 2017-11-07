import React, { Component } from 'react';
import Debug from 'debug';

const debug = Debug('fabnavi:components:searchbar');

export default class SearchBar extends Component {
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
                    hr{
                        border: 0;
                        border-bottom: 1px dashed #ccc;
                        background: #fff;
                    }
                    .search-bar {
                        width: 1200px;
                        position: relative;
                        margin-left: auto;
                        margin-right: auto;
                        padding-top:5px;
                        height: 28px;
                    }
                    form {
                        position: absolute;
                        right: 0;
                        margin-right: 125px;
                        width:240px;
                        background-color: white;
                        border-radius: 4px;
                        box-shadow: none;
                        border:solid 1px;
                        color:#CECECE;
                    }
                    input {
                        box-shadow: none;
                        line-height:40px;
                        background: none;
                        border: none;
                        width: 80%;
                        font-size:12pt;
                        float:right;
                        font-style:none;
                        color: #262626;
                    }
                    .search-icon {
                        margin:5px 0;
                        margin-left : 5px;
                        height: 28px;
                        width: 28px;
                        display:block;
                        background: url("/images/search_icon.png") no-repeat scroll 0 0;
                    }
                `}</style>
                <section className="belt">
                    <div className="menu-action search-bar">
                        <form>
                            <input id="search-box"/>
                            <span className="search-icon">
                            </span>
                        </form>
                    </div>
                </section>
            </div>
        )
    }
}

