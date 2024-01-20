const fs = require('node:fs');
const { join } = require('node:path');
const correct_path = join(__dirname, 'files_copy');
const original_path = join(__dirname, 'files');
console.log(correct_path);

fs.mkdir(correct_path, { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});

fs.readdir(original_path, (err, files) => {
  if (err) console.log(err);
  else {
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
