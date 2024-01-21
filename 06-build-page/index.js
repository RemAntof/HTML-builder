const fs = require('node:fs');
const { join } = require('node:path');
const main_folder_path = join(__dirname, 'project-dist');
const html_path = join(main_folder_path, 'index.html');
const css_path = join(main_folder_path, 'style.css');
fs.mkdir(main_folder_path, { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});
const assets_original_path = join(__dirname, 'assets');
const assets_path = join(main_folder_path, 'assets');
fs.mkdir(assets_path, { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

fs.readdir(assets_original_path, (err, folders) => {
  if (err) console.log(err);
  else {
    folders.forEach((folder) => {
      let assets_original_folder_path = join(assets_original_path, folder);
      let assets_folder_path = join(assets_path, folder);
      fs.mkdir(assets_folder_path, { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
      });
      fs.readdir(assets_original_folder_path, (err, files) => {
        if (err) console.log(err);
        else {
          files.forEach((file) => {
            fs.copyFile(
              join(assets_original_folder_path, file),
              join(assets_folder_path, file),
              (err) => {
                if (err) {
                  console.log('Error Found:', err);
                }
              },
            );
          });
        }
      });
    });
  }
});

// copy html
const html_write = fs.createWriteStream(html_path);
const original_html_path = join(__dirname, 'template.html');
const original_components_path = join(__dirname, 'components');
const readable_original_html = fs.createReadStream(original_html_path);
readable_original_html.on('readable', function () {
  let html;
  while ((html = this.read()) !== null) {
    // console.log(html.toString())

    //   console.log(data.toString().replace("{{header}}","test"));
    // html_write.write('\n' + html + '\n');
    components(html.toString());
  }
});

// fs.readdir(original_components_path, (err, files) => {
//   let readable;
//   if (err) console.log(err);
//   else {
//     files.forEach((file) => {
//       let name = file.split('.')[0];
//       readable = fs.createReadStream(join(original_components_path, file));
//       readable.on('readable', function () {
//         let data;
//         while ((data = this.read()) !== null) {
//           // console.log(html.toString().replace('{{'+name+'}}',data.toString))
//           // html = html.toString().replace('{{'+name+'}}',data.toString)
//           // console.log(html)
//           tryasda = data.toString();
//         }
//       });
//     });
//   }
// });

async function components(html) {
  fs.readdir(original_components_path, (err, files) => {
    let readable;
    if (err) console.log(err);
    else {
      files.forEach((file, index) => {
        let name = file.split('.')[0];
        readable = fs.createReadStream(join(original_components_path, file));
        readable.on('readable', function () {
          let data;
          while ((data = this.read()) !== null) {
            // console.log(html.toString().replace('{{'+name+'}}',data.toString))
            html = html.toString().replace('{{' + name + '}}', data.toString());
            if (index === files.length - 1) {
              html_write.write(html);
            }
          }
        });
      });
      // console.log(true);
    }
  });
}
// console.log(components())

const css_write = fs.createWriteStream(css_path);
const original_css_path = join(__dirname, 'styles');

fs.readdir(original_css_path, (err, files) => {
  let isFormat;
  let readable;
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      isFormat = file.split('.')[1] === 'css';
      if (isFormat) {
        readable = fs.createReadStream(join(original_css_path, file));
        readable.on('readable', function () {
          let data;
          while ((data = this.read()) !== null) {
            // console.log(data.toString());
            css_write.write(data);
          }
        });
      }
    });
  }
});
