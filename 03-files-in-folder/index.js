const { stdout } = process;
const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        stdout.write(`${path.parse(file).name} - `)
        stdout.write(`${path.extname(file).slice(1)} - `)
        stdout.write(`${stats.size}b\n`)
      }
    })
  }
})