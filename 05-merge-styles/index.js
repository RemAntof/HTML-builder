const fs = require('node:fs');
const { join } = require('node:path');
const correct_path = join(__dirname, 'styles');
const write_path = join(__dirname, 'project-dist', 'bundle.css');
const writableable = fs.createWriteStream(write_path);

fs.readdir(correct_path, (err, files) => {
  let isFormat;
  let readable;
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      isFormat = file.split('.')[1] === 'css';
      if (isFormat) {
        readable = fs.createReadStream(join(correct_path, file));
        readable.on('readable', function () {
          let data;
          while ((data = this.read()) !== null) {
            // console.log(data.toString());
            writableable.write('\n' + data + '\n');
          }
        });
      }
    });
  }
});
