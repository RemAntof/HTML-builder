const fs = require('fs');
// console.log(fs.dirname('/text.txt'));
fs.readFile('/test.txt', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});