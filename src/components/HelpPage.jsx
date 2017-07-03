import React from 'react';
import ReactDOM from 'react-dom';

import Debug from 'debug';
const debug = Debug('fabnavi:jsx:Help');

export default function HelpPage() { 
    return (
        <div className="helppage">
          <h2>Help Page</h2>
          <div className="partslist">
            <div className="parts">
              <div className="partstext">
                FabNavi_CrossPanel
              </div>
              <img src="./src/images/parts1.png" /> 
            </div>
            <div className="parts">
              <div className="partstext">
                FabNavi_LockBar
              </div>
              <img src="./src/images/parts2.png" /> 
            </div>
            <div className="parts">
              <div className="partstext">
                FabNavi_SidePanel
              </div>
              <img src="./src/images/parts3.png" />
            </div>
            <div className="parts">
              <div className="partstext">
                FabNavi_RearPanel
              </div>
              <img src="./src/images/parts4.png" />
            </div>
            <div className="parts">
              <div className="partstext">
                FabNavi_UnderRing
              </div>
              <img src="./src/images/parts5.png" />
            </div>
            <div className="parts">
              <div className="partstext">
               FabNavi_TopSpacer
              </div>
              <img src="./src/images/parts6.png" />
            </div>
          </div>
          <div className="makelist">
            <h2>How maiking</h2>
            <div className="make">
              <div className="maketext">
                FabNavi_CrossPanel同士を交差させるように差し込む
              </div>
              <img src="./src/images/make1.png" />
            </div>
            <div className="make">
              <div className="maketext">
                FabNavi_SidePanelをFabNavi_CrossPanelの端に差し込む
              </div>
              <img src="./src/images/make2.png" />
            </div>
            <div className="make">
              <div className="maketext">
                FabNavi_RearPanelにFabNavi_UnderRingを差し込む
              </div>
              <img src="./src/images/make3.png" />
            </div>
            <div className="make">
              <div className="maketext">
                FabNavi_RearPanelをFabNavi_SidePanelとFabNavi_CrossPanelの交差部分に差し込む
              </div>
              <img src="./src/images/make4.png" />
            </div>
            <div className="make">
              <div className="maketext">
                FabNavi_LockBarをFabNavi_SidePanelに差し込んで留める
              </div>
              <img src="./src/images/make5.png" />
            </div>
            <div className="make">
              <div className="maketext">
                FabNavi_LockBarにFabNavi_TopSpacerを差し込む
              </div>
              <img src="./src/images/make6.png" />
            </div>
          </div>
        </div>
    );
}
