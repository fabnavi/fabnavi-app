'use strict';
const { app, BrowserWindow, globalShortcut } = require('electron');
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
    const reloadShortcutRegistration = globalShortcut.register('CommandOrControl+R', () => {
        if(mainWindow){
            mainWindow.loadURL('file://' + __dirname + '/index.html');
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
})