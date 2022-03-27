const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

ipcRenderer.on('saveFile', (event, filePath) => {
  let contents = document.getElementById('tArea').value;
  fs.writeFileSync(filePath, contents, 'utf8');
});

ipcRenderer.on('openFile', (event, filePath) => {
  const contents = fs.readFileSync(filePath, 'utf8');
  document.getElementById('tArea').value = contents;
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  openImage: () => {
    const imgPath = ipcRenderer.sendSync('openImage');
    return imgPath;
  },
});
