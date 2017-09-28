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
});

app.on('ready', () => {
    autoUpdater.checkForUpdates();
});

const template = [
    {
        role: 'about',
        label: 'about',
        click () {
            dialog.showMessageBox(mainWindow, {
                title: 'fabnavi',
                type: 'info',
                message: 'fabnavi',
                detail: `\nVersion ${app.getVersion()}\nElectron ${process.versions['electron']}\nRenderer ${process.versions['chrome']}\nNode ${process.versions['node']}\nArchitecture ${process.arch}`,
                buttons: ['OK'],
                noLink: true
            });
        }
    }
]

if(process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services', submenu: [] },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    })

    // Edit menu
    template[1].submenu.push(
        { type: 'separator' },
        {
            label: 'Speech',
            submenu: [
                { role: 'startspeaking' },
                { role: 'stopspeaking' }
            ]
        }
    )

    // Window menu
    template[3].submenu = [
        { role: 'close' },
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
    ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)