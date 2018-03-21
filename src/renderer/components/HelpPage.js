import React from 'react';

import Debug from 'debug';
const debug = Debug('fabnavi:jsx:Help');
import { assetsPath } from '../utils/assetsUtils';

const MenuDescription = ({ title, src, children }) =>
    <div className="icon-container">
        <img src={src} />
        <div className="container-text">
            <h5>{title}</h5>
            <p>
                {children}
            </p>
        </div>
    </div>;

export default class HelpPage extends React.Component {
    render() {
        return (
            <div className="help-page">
                <h1>Fabnavi Help Page</h1>
                <hr />
                <div className="container">
                    <h3>Fabnavi Appの使い方</h3>

                    <MenuDescription src={`${assetsPath}/images/back.png`} title="Back Button">
                        一つ前の画面に戻ります.
                    </MenuDescription>
                    <hr />

                    <MenuDescription src={`${assetsPath}/images/home-icon.png`} title="Home Button">
                        トップページに遷移し，Publicプロジェクトを全て閲覧できます．
                    </MenuDescription>
                    <hr />

                    <MenuDescription src={`${assetsPath}'/images/myproject.png`} title="Project Button">
                        自分が作成したプロジェクトのみが表示されます．
                    </MenuDescription>
                    <hr />

                    <MenuDescription src={`${assetsPath}/images/sign-in.png`} title="Login Button">
                        押すとGitHubアカウントのログイン画面が展開します．ログインすると，全機能を使えるようになります．
                    </MenuDescription>
                    <hr />

                    <MenuDescription src={`${assetsPath}/images/help.png`} title="Help Page Button">
                        Fabnavi Help Pageに遷移します．
                    </MenuDescription>
                    <hr />

                    <MenuDescription src={`${assetsPath}/images/update.png`} title="Update Project Button" >
                        Fabnavi Serverに新しいプロジェクトがある時，このボタンを押すと表示するプロジェクトが最新の状態になります．
                    </MenuDescription>
                    <hr />


                    <div className="card-container">
                        <div className="card-image-box">
                            <img src={`${assetsPath}/images/project-card.png`} />
                            <img src={`${assetsPath}/images/project-card-menu.png`} />
                        </div>
                        <div className="card-container-text">
                            <h5>Project Card</h5>
                            <p>
                                Project CardはFabaviに投稿されたプロジェクトが入っています．Cardをクリックすると，play〜deleteの操作が表示されます．もう一度クリックすると，このメニューは閉じます．
                            </p>
                            <ul>
                                <li className="mark-list"><p>play:　player modeに遷移します．実際のプロジェクトの内容が表示されます．</p></li>
                                <li className="mark-list"><p>detail:　detail modeに遷移します．detail modeでは詳しい説明をみることが出来ます．</p></li>
                                <li className="mark-list"><p>edit:　edit modeに遷移します．プロジェクトのタイトルや説明などを変えたい場合に使います．自分のプロジェクトを選択した時のみ表示されます．</p></li>
                                <li className="mark-list"><p>delete:　選択したProjectをdeleteします．自分のプロジェクトを選択したときのみ表示されます．</p></li>
                            </ul>
                        </div>
                    </div>

                    <hr />

                    <div className="player-container">
                        <h5>Player Mode</h5>
                        <img src={`${assetsPath}/images/player-mode.png`} />
                        <p>Player Modeでは，プロジェクトの画像もしくは動画が再生されます．操作方法は以下の通りです．</p>
                        <ul>
                            <li className="mark-list"><p>プロジェクトが画像の場合:　マウスのクリックで操作します．左クリックで前のページ，右クリックで次のページに進みます．また，キーボードの左右キーでも同じ操作が可能です．</p></li>
                            <li className="mark-list"><p>プロジェクトが動画の場合:　マウスのクリックで操作します．左クリックで動画が再生されます．もう一度クリックすると，再生は止まります．</p></li>
                            <li className="mark-list"><p>Player Modeをやめる場合:　下にスクロールすると，Back Buttonがあります．クリックすると，ホーム画面に遷移します．また，キーボードのESCキーでも同様の操作が可能です．</p></li>
                        </ul>
                        <h6>- Calibration Modeについて -</h6>
                        <p>申し訳ありません，現在修正中です．実装され次第アプリケーションが更新されます．</p>
                    </div>
                </div>
            </div>
        );
    }
}
