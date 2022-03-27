const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1260,
    height: 720,
    minWidth: 720,
    minHeight: 600,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  let filePath;
  const filters = [
    { name: 'Markdown', extensions: ['md'] },
    { name: 'All', extensions: ['*'] },
  ];

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
          click: () => {
            const tmpPaths = dialog.showOpenDialogSync({ filters: filters });
            if (typeof tmpPaths !== 'undefined') {
              if (tmpPaths.length == 1) {
                filePath = tmpPaths[0];
                mainWindow.webContents.send('openFile', filePath);
              } else {
                dialog.showErrorBox('Error', '파일 하나만 여십시오!');
              }
            }
          },
        },
        { type: 'separator' },
        {
          label: '저장',
          click: () => {
            if (typeof filePath === 'undefined') {
              const tmpPath = dialog.showSaveDialogSync({ filters: filters });
              if (typeof tmpPath !== 'undefined') {
                filePath = tmpPath;
                mainWindow.webContents.send('saveFile', filePath);
              }
            } else {
              mainWindow.webContents.send('saveFile', filePath);
            }
          },
        },
        {
          label: '다른 이름으로 저장',
          click: () => {
            const tmpPath = dialog.showSaveDialogSync({ filters: filters });
            if (typeof tmpPath !== 'undefined') {
              filePath = tmpPath;
              mainWindow.webContents.send('saveFile', filePath);
            }
          },
        },
      ],
    },
    {
      label: '정보',
      submenu: [
        {
          label: '작성자',
          click: () => {
            const options = {
              title: '작성자',
              message: '작성자: 최정욱',
              detail: '서운중 20231 최정욱 - 2022-03-27',
              icon: path.join(__dirname, 'icon.png'),
            };
            dialog.showMessageBox(null, options);
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

ipcMain.on('openImage', (event) => {
  const filters = [
    { name: 'Image', extensions: ['png', 'jpg', 'jpeg'] },
    { name: 'All files', extensions: ['*'] },
  ];
  const image = dialog.showOpenDialogSync({ filters: filters });
  if (typeof image === 'undefined') event.returnValue = '';
  else if (image[0].indexOf(' ') !== -1) {
    dialog.showErrorBox('Error', '이미지 경로에 공백이 존재해서는 안됩니다!');
    event.returnValue = '';
  } else {
    event.returnValue = image;
  }
});
