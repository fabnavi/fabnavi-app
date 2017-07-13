'use strict';
const{ app, BrowserWindow, globalShortcut } = require('electron');

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
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  if(process.env.NODE_ENV != 'production') {
    const loadDevtool = require('electron-load-devtool');
    loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS);
    loadDevtool(loadDevtool.REDUX_DEVTOOLS);
  }

  const reloadShortcutRegistration = globalShortcut.register('CommandOrControl+R', () => {
    if(mainWindow) {
      mainWindow.loadURL('file://' + __dirname + '/index.html');
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
})