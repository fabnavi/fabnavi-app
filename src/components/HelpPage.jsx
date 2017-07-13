import React from 'react';

import Debug from 'debug';
const debug = Debug('fabnavi:jsx:Help');

export default class HelpPage extends React.Component {
    render() {
        return (
            <div className="help-page">
                <h1>Help Page</h1>
                <div className="parts-list">
                    <h2>Use parts</h2>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>A-a</h4>
                        </div>
                        <img src="./images/A-a.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>A-b</h4>
                        </div>
                        <img src="./images/A-b.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>A-c</h4>
                        </div>
                        <img src="./images/A-c.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>B-a</h4>
                        </div>
                        <img src="./images/B-a.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>B-b</h4>
                        </div>
                        <img src="./images/B-b.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>B-c</h4>
                        </div>
                        <img src="./imagesB-c.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>B-d</h4>
                        </div>
                        <img src="./imagesB-d.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>B-e</h4>
                        </div>
                        <img src="./imagesB-e.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>B-f</h4>
                        </div>
                        <img src="./imagesB-f.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>C-a</h4>
                        </div>
                        <img src="./imagesC-a.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>C-b</h4>
                        </div>
                        <img src="./imagesC-b.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>C-c</h4>
                        </div>
                        <img src="./imagesC-c.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>C-d</h4>
                        </div>
                        <img src="./imagesC-d.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>C-e</h4>
                        </div>
                        <img src="./imagesC-e.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>C-f</h4>
                        </div>
                        <img src="./imagesC-f.png" />
                    </div>
                </div>

                <div className="make-list">
                    <h2>How making of スマホ固定用マウント</h2>
                    <div className="make">
                        <div className="make-text">
                            <h4>01.ミスミフレームの長ナットにパーツA-aを2つ向かい合うように差し込み，片方を長ナット先端のボルト穴で固定する．</h4>
                        </div>
                        <img src="./imagesFabnavi_Stand_01.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>02.パーツA-bをボルト(10㎜)に差し込み，接着剤で固定する．</h4>
                        </div>
                        <img src="./imagesFabnavi_Stand_02.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>03.01で作成したものをパーツA-c上部の長ナット用穴に差し込み，ボルト(10㎜)で固定する．パーツA-c下部の穴には先入れ短ナットとボルト(10㎜)，02で作成したものを固定する．</h4>
                        </div>
                        <img src="./imagesFabnavi_Stand_03.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>04.03で作成したものをミスミフレームに差し込み，その後ミスミブラインドブラケットを差し込んでイモネジ(6㎜)でミスミフレームに固定する．</h4>
                        </div>
                        <img src="./imagesFabnavi_Stand_04.png" />
                    </div>

                    <h2>How making of プロジェクター固定用マウント</h2>
                    <div className="make">
                        <div className="make-text">
                            <h4>01.パーツB-aにパーツB-bを差し込む．</h4>
                        </div>
                        <img src="./images/Fabnavi_Smaho_01.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>02.01で作成したパーツにミスミフレームを差し込む．パーツB-cはそのまま，パーツB-dは後入れ短ナット，ボルト(10㎜)を用いてミスミフレームに取り付ける．</h4>
                        </div>
                        <img src="./images/Fabnavi_Smaho_02.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>03.パーツB-eをパーツB-fの穴にフラットな面を上にして差し込む．パーツB-fの溝に先入れ短ナットを差し込み，ナットにボルト(14㎜)を軽くねじ込む．</h4>
                        </div>
                        <img src="./imagesFabnavi_Smaho_03.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>4. FabNavi_RearPanelをFabNavi_SidePanelとFabNavi_CrossPanelの交差部分に差し込む</h4>
                        </div>
                        <img src="./imagesFabnavi_Smaho_04.png" />
                    </div>

                    <h2>How making of スタンド</h2>
                    <div className="make">
                        <div className="make-text">
                            <h4>01.パーツC-a同士を交差させるように差し込む．</h4>
                        </div>
                        <img src="./imagesFabnavi_Projector_01.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>02.パーツC-bをパーツC-aの端に差し込む．</h4>
                        </div>
                        <img src="./imagesFabnavi_Projector_01.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>03.パーツC-cにパーツC-dを差し込む．</h4>
                        </div>
                        <img src="./imagesFabnavi_Projector_02.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>04.パーツC-cをパーツC-aとパーツC-bの交差部分に差し込む．</h4>
                        </div>
                        <img src="./imagesFabnavi_Projector_03.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>05.パーツC-eをパーツC-bの上下にそれぞれ差し込んで留め，上のパーツC-eにパーツC-fを差し込む．</h4>
                        </div>
                        <img src="./imagesFabnavi_Projector_04.png" />
                    </div>

                    <h2>How making of 全体の組み立て</h2>
                    <div className="make">
                        <div className="make-text">
                            <h4>01.スタンドのパーツC-dにプロジェクター固定用マウントのミスミフレームを差し込み，パーツC-d下部の穴で後入れ短ナットとボルト(10㎜)で固定する．</h4>
                        </div>
                        <img src="./imagesFabnavi_001.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>02.スマホ固定用マウントとプロジェクター固定用マウントのミスミフレームをミスミ直角接続ブラケットと先入れナット，ボルト(10㎜)を用いて固定する．</h4>
                        </div>
                        <img src="./imagesFabnavi_002.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>03.プロジェクターをプロジェクター固定用マウントパーツB-aにはめて固定する．</h4>
                        </div>
                        <img src="./imagesFabnavi_003.png" />
                    </div>
                </div>
            </div>
        );
    }
}
