'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const loadDevtool = require('electron-load-devtool');

let mainWindow = null;

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        frame: true,
        show: true,
    });
    // mainWindow.setFullScreen(true);

    mainWindow.maximize();
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
})