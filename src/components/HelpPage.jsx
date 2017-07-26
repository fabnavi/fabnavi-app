import React from 'react';

import Debug from 'debug';
const debug = Debug('fabnavi:jsx:Help');

export default class HelpPage extends React.Component {
    render() {
        return (
            <div className="help-page">
                <h1>Fabnavi Help Page</h1>
                <hr />
                <div className="about-application">
                    <h3 className="contents-title">このアプリの使い方</h3>
                    <p className="text-contents">
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                    </p>
                </div>

                <hr />

                <div className="fabnavi-inquiry">
                    <h3 className="contents-title">お問い合わせ</h3>
                    <p className="text-contents">
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                        hogehogehogehogehogehogehogehogehoge
                    </p>
                </div>
            </div>
        );
    }
}
