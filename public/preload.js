const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const os = require('os');
const JSZip = require('jszip');
const path = require('path');

ipcRenderer.on('saveFile', (event, [filePath, images]) => {
  let contents = document.getElementById('tArea').value;
  if (filePath.slice(-3) === 'mdz') {
    const filePathSplit = filePath.split('/');
    const fileName = filePathSplit[filePathSplit.length - 1].slice(0, -4);
    const zip = new JSZip();
    for (let i in images) {
      const imageSplit = images[i].split('/');
      const image = imageSplit[imageSplit.length - 1];
      zip.file(image, fs.readFileSync(images[i]));
    }
    zip.file(`${fileName}.md`, contents);
    zip.file('images.txt', images.toString());
    document.getElementById('tArea').value = contents;
    zip
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream(filePath))
      .on('finish', () => {
        const dest = [];
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          fs.mkdtemp(path.join(os.tmpdir(), 'md_img-'), (err, directory) => {
            zip.loadAsync(data).then((zip) => {
              Object.keys(zip.files).forEach((readFileName) => {
                zip.files[readFileName].async('nodebuffer').then((fileData) => {
                  dest.push(path.join(directory, readFileName));
                  fs.writeFileSync(dest[dest.length - 1], fileData);
                });
              });
            });
            setTimeout(() => {
              const imgDest = dest.filter((word) => {
                return (
                  word.slice(word.length - 2) != 'md' &&
                  word.slice(word.length - 3) != 'txt'
                );
              });
              for (let i in imgDest) {
                document.getElementById('tArea').value = contents.replace(
                  images[i],
                  imgDest[i]
                );
              }
            }, 1000);
          });
        });
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
