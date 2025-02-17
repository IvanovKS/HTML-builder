const fs = require("fs");
const path = require("path");

const projectDistPath = path.resolve(__dirname, "../06-build-page", "./project-dist");
const pathOfAllStyles = path.resolve(__dirname, "../06-build-page", "./styles");
const pathOfStyleCSS = path.resolve(__dirname, "../06-build-page", "./project-dist", "style.css");
const newAssetsPath = path.resolve(__dirname, "../06-build-page", "./project-dist", "assets");
const oldAssetsPath = path.resolve(__dirname, "../06-build-page", "./assets");

const { stdout } = process;

function makeDir() {
  fs.mkdir(projectDistPath, { recursive: true }, function (error) {
    if (error) {
      throw error;
    } else {
      fs.mkdir(newAssetsPath, { recursive: true }, function (error) {
        if (error) {
          throw error;
        }
      });
    }
  });
}
makeDir();

function copyDir(src, dest) {
  fs.mkdir(dest, { recursive: true }, function(error) {
    if (error) {
      throw error;
    } else {
      fs.readdir(src, { withFileTypes: true }, function(error, elements) {
        if (error) {
          throw error;
        } else {
          elements.forEach(function(element) {
            if (element.isFile()) {
              fs.promises.copyFile(path.join(src, element.name), path.join(dest, element.name));
            } else if (element.isDirectory()) {
              const newSrc = path.join(src, element.name);
              const newDest = path.join(dest, element.name);
              copyDir(newSrc, newDest);
            }
          });
        }
      });
    }
  });
}
copyDir(oldAssetsPath, newAssetsPath);


let writeableStream = fs.createWriteStream(pathOfStyleCSS);
fs.createWriteStream(pathOfStyleCSS, "utf8", function (error) {
  if (error) {
    throw error;
  }
});

fs.readdir(pathOfAllStyles, { withFileTypes: true }, function (error, element) {
  if (error) {
    throw error;
  } else {
    element.forEach(function (element) {
      if (element.isFile() && path.extname(element.name) === '.css') {
        let filesCSS = path.resolve(__dirname, "../06-build-page", "./styles", element.name);
        let readableStream = fs.createReadStream(filesCSS);
        fs.createReadStream(filesCSS, "utf8", function (error) {
          if (error) {
            throw error;
          }
        });
        readableStream.pipe(writeableStream);
    }
    });
    stdout.write(`\r\n"style.css" содержит стили из всех файлов папки styles`); //! переделать вывод письма
  }
});

