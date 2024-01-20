const fs = require('node:fs');
const { join } = require('node:path');
const correct_path = join(__dirname, 'file.txt');
const writableable = fs.createWriteStream(correct_path);

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
readline.setPrompt(
  '\nHi there, good to see you. Now you can enter your message.\n\n',
);
readline.prompt();
readline.on('line', (input) => {
  let data = input.toString();
  if (data.toLocaleUpperCase() === 'EXIT') {
    readline.close();
  } else {
    writableable.write('\n' + data + '\n');
  }
});
readline.on('close', () => {
  console.log('\nBy, hope to see you again\n');
});
