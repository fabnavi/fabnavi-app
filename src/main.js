'use strict';
const{ app, BrowserWindow, globalShortcut, Menu, dialog } = require('electron');
const{ autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let mainWindow = null;

autoUpdater.on('update-available', (info) => {
    log.info(info);
    log.info('Update available.');
});

autoUpdater.on('update-downloaded', (info) => {
    log.info(info);
    log.info('Update downloaded; will install in 5 seconds');
});

autoUpdater.on('error', (err) => {
    log.error(err);
    log.info('Error in auto-updater.');
});

autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
});

autoUpdater.on('update-not-available', (info) => {
    log.info(info);
    log.info('Update not available.');
});

autoUpdater.on('update-downloaded', (info) => {
    log.info(info);
    setTimeout(() => {
        autoUpdater.quitAndInstall();
    }, 5000);
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', () => {
    mainWindow = null;
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

    const template = [
        {
            label: 'fabnavi',
            submenu: [
                {
                    label: 'Restart',
                    click: () => mainWindow.reload(),
                },
                {
                    label: 'DevTools',
                    accelerator: 'Alt+CmdOrCtrl+J',
                    click: () => mainWindow.webContents.openDevTools({ mode: 'detach' }),
                },
                {
                    label: 'Quit App',
                    accelerator: 'Command+Q',
                    click: () => app.quit(),
                },
                {
                    type: 'separator',
                },
                {
                    label: 'About',
                    click: () => dialog.showMessageBox(mainWindow, {
                        title: 'fabnavi',
                        type: 'info',
                        message: 'fabnavi',
                        detail: `\nVersion: ${app.getVersion()}\nElectron: ${process.versions.electron}\nRenderer: ${process.versions.chrome}\nNode: ${process.versions.node}\nArchitecture: ${process.platform + ' ' + process.arch}`,
                        buttons: ['OK'],
                        noLink: true
                    })
                },
            ],
        }, {
            label: 'Edit',
            submenu: [{
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                selector: 'undo:'
            }, {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                selector: 'redo:'
            }, {
                type: 'separator'
            }, {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                selector: 'cut:'
            }, {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                selector: 'copy:'
            }, {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                selector: 'paste:'
            }, {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                selector: 'selectAll:'
            }]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    app.on('activate', () => {
        mainWindow.show();
    });
});

app.on('ready', () => {
    if(!isDev) {
        autoUpdater.checkForUpdates();
    }
});
