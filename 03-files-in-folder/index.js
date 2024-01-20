const fs = require('node:fs');
const { join } = require('node:path');
const correct_path = join(__dirname, 'secret-folder');
console.log(correct_path)

fs.readdir(correct_path,(err, files) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log("\nCurrent directory filenames:"); 
      files.forEach(file => { 
        console.log(file); 
      }) 
    } 
  }) 
