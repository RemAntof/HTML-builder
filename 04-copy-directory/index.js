const fs = require('node:fs');
const { join } = require('node:path');
const correct_path = join(__dirname, 'files_copy');
const original_path = join(__dirname, 'files');
console.log(correct_path);
fs.mkdir(correct_path, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});

fs.readdir(original_path, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      let fileName;
      let format;
      console.log(join(original_path, file));
      fs.stat(join(original_path, file), (err, stats) => {
        if (err) {
          console.error(err);
        }
        if (stats.isFile()) {
          fileName = file.split('.')[0];
          format = file.split('.')[1];
          fs.copyFile(
            file,
            join(correct_path, 'copy_' + fileName + '.' + format),
            (err) => {
              if (err) {
                console.log('Error Found:', err);
              }
            },
          );
        }
      });
    });
  }
});
