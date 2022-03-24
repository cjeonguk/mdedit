const { ipcRenderer } = require('electron');
const fs = require('fs');

ipcRenderer.on('saveAsPath', (event, path) => {
  const contents = document.getElementById('tArea').value;
  fs.writeFileSync(path, contents, 'utf8');
});
