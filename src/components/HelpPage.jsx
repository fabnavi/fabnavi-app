import React from 'react';

import Debug from 'debug';
const debug = Debug('fabnavi:jsx:Help');

export default class HelpPage extends React.Component {
    render() {
        return (
            <div className="help-page">
                <h1>Fabnavi Help Page</h1>
                <hr />
                <div className="container">
                    <h3>Fabnavi Appの使い方</h3>
                    <div className="icon-container">
                        <img src="./images/back.png" />
                        <div className="container-text">
                            <h5>Back Button</h5>
                            <p>
                                一つ前の画面に戻ります．
                            </p>
                        </div>
                    </div>

                    <hr />

                    <div className="icon-container">
                        <img src="./images/home.png" />
                        <div className="container-text">
                            <h5>Home Button</h5>
                            <p>
                                トップページに遷移し，Publicプロジェクトを全て閲覧できます．
                            </p>
                        </div>
                    </div>

                    <hr />

                    <div className="icon-container">
                        <img src="./images/myproject.png" />
                        <div className="container-text">
                            <h5>My Project Button</h5>
                            <p>
                                自分が作成したプロジェクトのみが表示されます．
                            </p>
                        </div>
                    </div>

                    <hr />

                    <div className="icon-container">
                        <img src="./images/signin.png" />
                        <div className="container-text">
                            <h5>Login Button</h5>
                            <p>
                                押すとGitHubアカウントのログイン画面が展開します．ログインすると，全機能を使えるようになります．
                            </p>
                        </div>
                    </div>

                    <hr />

                    <div className="icon-container">
                        <img src="./images/help.png" />
                        <div className="container-text">
                            <h5>Help Page Button</h5>
                            <p>
                                Fabnavi Help Pageに遷移します．
                            </p>
                        </div>
                    </div>

                    <hr />

                    <div className="icon-container">
                        <img src="./images/update.png" />
                        <div className="container-text">
                            <h5>Update Project Button</h5>
                            <p>
                                Fabnavi Serverに新しいプロジェクトがある時，このボタンを押すと表示するプロジェクトが最新の状態になります．
                            </p>
                        </div>
                    </div>

                    <hr />

                    <div className="card-container">
                        <div className="card-image-box">
                            <img src="./images/project-card.png" />
                            <img src="./images/project-card-menu.png" />
                        </div>
                        <div className="card-container-text">
                            <h5>Project Card</h5>
                            <p>
                                Project CardはFabaviに投稿されたプロジェクトが入っています．Cardをクリックすると，play〜deleteの操作が表示されます．もう一度クリックすると，このメニューは閉じます．
                            </p>
                            <ul>
                                <li><p>play:　player modeに遷移します．実際のプロジェクトの内容が表示されます．</p></li>
                                <li><p>detail:　detail modeに遷移します．detail modeでは詳しい説明をみることが出来ます．</p></li>
                                <li><p>edit:　edit modeに遷移します．プロジェクトのタイトルや説明などを変えたい場合に使います．自分のプロジェクトを選択した時のみ表示されます．</p></li>
                                <li><p>delete:　選択したProjectをdeleteします．自分のプロジェクトを選択したときのみ表示されます．</p></li>
                            </ul>
                        </div>
                    </div>

                    <hr />

                    <div className="player-container">
                        <h5>Player Mode</h5>
                        <img src="./images/player-mode.png" />
                        <p>Player Modeでは，プロジェクトの画像もしくは動画が再生されます．操作方法は以下の通りです．</p>
                        <ul>
                            <li><p>プロジェクトが画像の場合:　マウスのクリックで操作します．左クリックで前のページ，右クリックで次のページに進みます．また，キーボードの左右キーでも同じ操作が可能です．</p></li>
                            <li><p>プロジェクトが動画の場合:　マウスのクリックで操作します．左クリックで動画が再生されます．もう一度クリックすると，再生は止まります．</p></li>
                            <li><p>Player Modeをやめる場合:　下にスクロールすると，Back Buttonがあります．クリックすると，ホーム画面に遷移します．また，キーボードのESCキーでも同様の操作が可能です．</p></li>
                        </ul>
                        <h6>- Calibration Modeについて -</h6>
                        <p>申し訳ありません，現在修正中です．実装され次第，アプリケーションが更新されます．</p>
                    </div>
                </div>
            </div>
        );
    }
}
