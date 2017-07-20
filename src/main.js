'use strict';
const{ app, BrowserWindow, globalShortcut } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow = null;

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        frame: true,
        show: true,
    });

    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/index.html?isDev=${isDev}`);

    if(isDev) {
        const loadDevtool = require('electron-load-devtool');
        loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS);
        loadDevtool(loadDevtool.REDUX_DEVTOOLS);
    }

    const reloadShortcutRegistration = globalShortcut.register('CommandOrControl+R', () => {
        if(mainWindow) {
            mainWindow.loadURL(`file://${__dirname}/index.html?isDev=${isDev}`);
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
})
