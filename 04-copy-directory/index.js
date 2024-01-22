const fs = require('node:fs');
const { join } = require('node:path');
const correct_path = join(__dirname, 'files-copy');
const original_path = join(__dirname, 'files');
console.log(correct_path);

fs.mkdir(correct_path, { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

fs.readdir(original_path, (err, files) => {
  if (err) console.log(err);
  else {
    fs.readdir(correct_path, (err, copy_files) => {
      if (err) console.log(err);
      else {
        if (files !== copy_files) {
          copy_files.forEach((copy_file) => {
            if (!files.includes(copy_file)) {
              fs.unlink(join(correct_path, copy_file), (err) => {
                if (err) console.log(err);
              });
            }
          });
        }
      }
    });
    files.forEach((file) => {
      fs.copyFile(
        join(original_path, file),
        join(correct_path, file),
        (err) => {
          if (err) {
            console.log('Error Found:', err);
          }
        },
      );
    });
  }
});
