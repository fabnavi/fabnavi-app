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
                            <h4>FabNavi_CrossPanel * 2</h4>
                        </div>
                        <img src="./src/images/parts1.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>FabNavi_LockBar * 2</h4>
                        </div>
                        <img src="./src/images/parts2.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>FabNavi_SidePanel * 2</h4>
                        </div>
                        <img src="./src/images/parts3.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>FabNavi_RearPanel * 1</h4>
                        </div>
                        <img src="./src/images/parts4.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>FabNavi_UnderRing * 1</h4>
                        </div>
                        <img src="./src/images/parts5.png" />
                    </div>
                    <div className="parts">
                        <div className="parts-text">
                            <h4>FabNavi_TopSpacer * 1</h4>
                        </div>
                        <img src="./src/images/parts6.png" />
                    </div>
                </div>
                <div className="make-list">
                    <h2>How making</h2>
                    <div className="make">
                        <div className="make-text">
                            <h4>1. FabNavi_CrossPanel同士を交差させるように差し込む</h4>
                        </div>
                        <img src="./src/images/make1.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>2. FabNavi_SidePanelをFabNavi_CrossPanelの端に差し込む</h4>
                        </div>
                        <img src="./src/images/make2.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>3. FabNavi_RearPanelにFabNavi_UnderRingを差し込む</h4>
                        </div>
                        <img src="./src/images/make3.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>4. FabNavi_RearPanelをFabNavi_SidePanelとFabNavi_CrossPanelの交差部分に差し込む</h4>
                        </div>
                        <img src="./src/images/make4.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>5. FabNavi_LockBarをFabNavi_SidePanelに差し込んで留める</h4>
                        </div>
                        <img src="./src/images/make5.png" />
                    </div>
                    <div className="make">
                        <div className="make-text">
                            <h4>6. FabNavi_LockBarにFabNavi_TopSpacerを差し込む</h4>
                        </div>
                        <img src="./src/images/make6.png" />
                    </div>
                </div>
            </div>
        );
    }
}
