const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

let savePath;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1260,
    height: 720,
    minWidth: 720,
    minHeight: 480,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
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
    {
      label: '파일',
      submenu: [
        {
          label: '열기',
        },
        { type: 'separator' },
        {
          label: '저장',
        },
        {
          label: '다른 이름으로 저장',
          click: () => {
            const filters = [
              { name: 'Markdown', extensions: ['md'] },
              { name: 'Markdown Zip', extensions: ['mdx'] },
            ];
            savePath = dialog.showSaveDialogSync({ filters: filters });
            mainWindow.webContents.send('saveAsPath', savePath);
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.webContents.openDevTools();
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
