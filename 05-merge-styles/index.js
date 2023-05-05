const fs = require("fs");
const path = require("path");
const pathOfStyles = path.resolve(__dirname, "../05-merge-styles", "./styles");
const pathOfBundle = path.resolve(__dirname, "../05-merge-styles", "./project-dist", "bundle.css");

const { stdout } = process;

let writeableStream = fs.createWriteStream(pathOfBundle);
fs.createWriteStream(pathOfBundle, "utf8", function (error) {
  if (error) {
    throw error;
  }
});

fs.readdir(pathOfStyles, { withFileTypes: true }, function (error, element) {
  if (error) {
    throw error;
  } else {
    element.forEach(function (el) {
      if (el.isFile() && path.extname(el.name) === '.css') {
        let filesCSS = path.resolve(__dirname, "../05-merge-styles", "./styles", el.name);
        let readableStream = fs.createReadStream(filesCSS);
        fs.createReadStream(filesCSS, "utf8", function (error) {
          if (error) {
            throw error;
          }
        });
        readableStream.pipe(writeableStream);
    }
    });
    stdout.write(`Готово! "bundle.css" создан и содержит стили из всех файлов папки styles`);
  }
});