const fs = require('fs');
const path = require('path');
let temp = '';

fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, fileContent) => {
  if(err) throw err;
  temp = fileContent;
});

fs.mkdir(path.join(__dirname, 'project-dist/assets'), { recursive: true }, err => {
  if (err) throw err;

  fs.readdir(path.join(__dirname, 'components'), (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.stat(path.join(__dirname, 'components', file), (err, stats) => {
        if (err) throw err;
        if (stats.isFile() && path.extname(file) === '.html') {
          fs.readFile(path.join(__dirname, 'components', file), 'utf8', (err, html) => {
            if(err) throw err;
            temp = temp.replace(`{{${path.parse(file).name}}}`, html);
            fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), temp, err => {
              if (err) throw err;
            });
          })
        }
      })
    }
  })

  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', err => {
    if (err) throw err;
    fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.stat(path.join(__dirname, 'styles', file), (err, stats) => {
          if (err) throw err;
          if (stats.isFile() && path.extname(file) === '.css') {
            fs.readFile(path.join(__dirname, 'styles', file), 'utf8', (err, data) => {
              if (err) throw err;
              fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), `${data}\n`, err => {
                if (err) throw err;
              })
            })
          }
        })
      }
    })
  });

  fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
    if (err) throw err;
    for (const file of files) {

      fs.stat(path.join(__dirname, 'assets', file), (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          fs.mkdir(path.join(__dirname, 'project-dist/assets', file), { recursive: true }, err => {
            if (err) throw err;
            fs.readdir(path.join(__dirname, 'project-dist/assets', file), (err, files) => {
              if (err) throw err;
              if (files.length > 0) {
                for (const i of files) {
                  fs.unlink(path.join(__dirname, 'project-dist/assets', file, i), () => {
                    if (err) throw err;
                  });
                }
              }

              fs.readdir(path.join(__dirname, 'assets', file), (err, files) => {
                if (err) throw err;
                for (const filein of files) {
                  fs.stat(path.join(__dirname, 'assets', file, filein), (err, stats) => {
                    if (err) throw err;
                    if (stats.isFile()) {
                      fs.copyFile(path.join(__dirname, 'assets', file, filein), path.join(__dirname, 'project-dist/assets', file, filein), () => {
                        if (err) throw err;
                      });
                    }
                  })
                }
              })
            }
            )

          })
        }
      })
    }
  })
});