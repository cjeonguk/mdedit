const { app, BrowserWindow, Menu /*, dialog*/ } = require('electron');
const path = require('path');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1260,
    height: 720,
    minWidth: 720,
    minHeight: 480,
  });

  const isMac = process.platform === 'darwin';
  const menuTemplate = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  window.loadFile(path.join(__dirname, 'index.html'));

  window.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
