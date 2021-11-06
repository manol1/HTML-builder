const fs = require('fs');
const path = require('path');


fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
  if (err) throw err;
});

fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
  if (err) throw err;
  if (files.length > 0) {
    for (const file of files) {
      fs.unlink(path.join(__dirname, 'files-copy', file), () => {
        if (err) throw err;
      });
    }
  }
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), () => {
        if (err) throw err;
      });
    }
  })
})

