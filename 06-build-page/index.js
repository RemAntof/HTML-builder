const fs = require('node:fs');
const { join } = require('node:path');
const main_folder_path = join(__dirname, 'project-dist');
const html_path = join(main_folder_path, 'index.html');
const css_path = join(main_folder_path, 'style.css');
fs.mkdir(main_folder_path, { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});
const assets_path = join(main_folder_path, 'assets');
fs.mkdir(assets_path, { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});

const html_write = fs.createWriteStream(html_path);
const css_write = fs.createWriteStream(css_path);
