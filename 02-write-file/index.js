const fs = require('node:fs');
const {join} = require('node:path');
const readline = require('readline').createInterface({
    input: process.stdin,
  });
 readline.on("line",(input)=>{
    let data = input.toString()
    if(data.toLocaleUpperCase() === "EXIT"){
        readline.close()
    }
 });

// const writble = fs.createWriteStream('file.txt');
const correct_path = join(__dirname,'file.txt');
const readable = fs.createReadStream(correct_path);
fs.writeFile(correct_path,"",function (err) {
    if (err) throw err;
  });
readable.on('readable', function() {
  let data
  while ((data = this.read()) !== null) {
    console.log(data.toString());
  }
  });