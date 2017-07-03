import React from 'react';
import ReactDOM from 'react-dom';

import Debug from 'debug';
const debug = Debug('fabnavi:jsx:Help');

export default function HelpPage() { 
    return (
        <div className="help">
          <h2>Help Page</h2>
          <div className="partslist">
            <div className="parts">
              <img src="./src/images/parts1.png" />
              FabNavi_CrossPanel
            </div>
            <div className="patrs">
              <img src="./src/images/parts2.png" />
              FabNavi_LockBar
            </div>
            <div className="parts">
              <img src="./src/images/parts3.png" />
              FabNavi_SidePanel
            </div>
            <div className="parts">
              <img src="./src/images/parts4.png" />
              FabNavi_RearPanel
            </div>
            <div className="parts">
              <img src="./src/images/parts5.png" />
              FabNavi_UnderRing
            </div>
            <div className="part">
              <img src="./src/images/parts6.png" />
              FabNavi_TopSpacer
            </div>
          </div>
          <div className="howmake">
            How maiking
            <div className="make">
              <div className="howmaketext">
                FabNavi_CrossPanel同士を交差させるように差し込む
                <img src="./src/images/make1.png" />
              </div>
            </div>
            <div className="make">
              <div className="howmaketext">
                FabNavi_SidePanelをFabNavi_CrossPanelの端に差し込む
                <img src="./src/images/make1.png" />
              </div>
            </div>
            <div className="make">
              <div className="howmaketext">
                FabNavi_RearPanelにFabNavi_UnderRingを差し込む
                <img src="./src/images/make1.png" />
              </div>
            </div>
            <div className="make">
              <div className="howmaketext">
                FabNavi_RearPanelをFabNavi_SidePanelとFabNavi_CrossPanelの交差部分に差し込む
                <img src="./src/images/make1.png" />
              </div>
            </div>
            <div className="make">
              <div className="howmaketext">
                FabNavi_LockBarをFabNavi_SidePanelに差し込んで留める
                <img src="./src/images/make1.png" />
              </div>
            </div>
            <div className="make">
              <div className="howmaketext">
                FabNavi_LockBarにFabNavi_TopSpacerを差し込む
                <img src="./src/images/make6.png" />
              </div>
            </div>
          </div>
        </div>
    );
}
