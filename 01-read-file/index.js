const fs = require('node:fs');
const {join} = require('node:path');
const correct_path = join(__dirname,'text.txt');
const rr = fs.createReadStream(correct_path);
rr.on('readable', () => {
    console.log(`readable: ${rr.read()}`);
  });