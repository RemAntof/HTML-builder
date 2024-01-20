const fs = require('node:fs');
const { join } = require('node:path');
const correct_path = join(__dirname, 'secret-folder');
console.log(correct_path);

fs.readdir(correct_path, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      let fileName;
      let format;
      let fileSize;
      fs.stat(join(correct_path, file), (err, stats) => {
        if (err) {
          console.error(err);
        }
        if (stats.isFile()) {
          fileName = file.split('.')[0];
          format = file.split('.')[1];
          fileSize = Math.round((stats.size / 1024) * 1000) / 1000 + 'kb';
          console.log(fileName + ' - ' + format + ' - ' + fileSize);
        }
      });
    });
  }
});
