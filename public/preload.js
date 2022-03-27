const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

ipcRenderer.on('saveFile', (event, filePath) => {
  let contents = document.getElementById('tArea').value;
  fs.writeFileSync(filePath, contents, 'utf8');
});

ipcRenderer.on('openFile', (event, filePath) => {
  const contents = fs.readFileSync(filePath, 'utf8');
  document.getElementById('tArea').value = contents;
  document
    .getElementById('tArea')
    .dispatchEvent(new Event('change', { bubbles: true }));
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  openImage: () => {
    const imgPath = ipcRenderer.sendSync('openImage');
    for (let i in imgPath) {
      imgPath[i] = imgPath[i].replaceAll('\\', '/');
    }
    return imgPath;
  },
});
