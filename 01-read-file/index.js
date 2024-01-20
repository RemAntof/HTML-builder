const fs = require('node:fs');
const { join } = require('node:path');
const correct_path = join(__dirname, 'text.txt');
const readable = fs.createReadStream(correct_path);
readable.on('readable', function () {
  let data;
  while ((data = this.read()) !== null) {
    console.log(data.toString());
  }
});
