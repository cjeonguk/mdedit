const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const JSZip = require('jszip');

ipcRenderer.on('saveFile', (event, [filePath, images]) => {
  let contents = document.getElementById('tArea').value;
  if (filePath.slice(-3) === 'mdz') {
    const filePathSplit = filePath.split('/');
    const fileName = filePathSplit[filePathSplit.length - 1].slice(0, -4);
    const zip = new JSZip();
    const photoZip = zip.folder('photos');
    for (let i in images) {
      const imageSplit = images[i].split('/');
      const image = imageSplit[imageSplit.length - 1];
      photoZip.file(image, fs.readFileSync(images[i]));
      contents = contents.replace(images[i], `photos/${image}`);
    }
    zip.file(`${fileName}.md`, contents);
    document.getElementById('tArea').value = contents;
    zip
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream(`${filePath}`))
      .on('finish', () => {
        console.log('zip written.');
      });
  } else {
    fs.writeFileSync(filePath, contents, 'utf8');
  }
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
