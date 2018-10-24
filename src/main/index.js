const{ app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const{ autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
const log = require('electron-log');
const{ download } = require('electron-dl');

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
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
        frame: false,
        show: true,
        kiosk: isDev ? false : true,
        'fullscreen': isDev ? false : true,
        webPreferences: {
            webSecurity: false
        }
    });

    // Set url for `win`
    // points to `webpack-dev-server` in development
    // points to `index.html` in production
    const url = isDev ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}` : `file://${__dirname}/index.html`

    if(!isDev) mainWindow.maximize();
    mainWindow.loadURL(url);

    if(isDev) {
        const loadDevtool = require('electron-load-devtool');
        loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS);
        loadDevtool(loadDevtool.REDUX_DEVTOOLS);
    }

    const template = [
        {
            label: 'fabnavi',
            submenu: [
                {
                    label: 'About fabnavi',
                    click: () => dialog.showMessageBox(mainWindow, {
                        title: 'fabnavi',
                        type: 'info',
                        message: 'fabnavi',
                        detail: `\nVersion: ${app.getVersion()}\nElectron: ${process.versions.electron}\nRenderer: ${process.versions.chrome}\nNode: ${process.versions.node}\nArchitecture: ${process.platform + ' ' + process.arch}`,
                        buttons: ['OK'],
                        noLink: true
                    })
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Reload',
                    accelerator: 'CommandOrControl+R',
                    click: () => mainWindow.loadURL(url),
                },
                {
                    label: mainWindow.isKiosk() ? 'Quit Kiosk Mode' : 'Start Kiosk Mode',
                    accelerator: 'Shift+CommandOrControl+K',
                    click: () => mainWindow.setKiosk(!mainWindow.isKiosk()),
                },
                {
                    type: 'separator',
                },
                {
                    label: 'DevTools',
                    accelerator: 'Alt+CmdOrCtrl+J',
                    click: () => mainWindow.webContents.openDevTools({ mode: 'detach' }),
                },
                {
                    label: 'Restart fabnavi',
                    accelerator: 'Shift+CommandOrControl+R',
                    click: () => mainWindow.reload(),
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: () => app.quit(),
                }
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

    ipcMain.on('download', (event, data) => {
        download(BrowserWindow.getFocusedWindow(), data.url, data.properties)
            .then(dl => window.webContents.send('download complete', dl.getSavePath()));
    })
});

app.on('ready', () => {
    if(!isDev) {
        autoUpdater.checkForUpdates();
    }
});
