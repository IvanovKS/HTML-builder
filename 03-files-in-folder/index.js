const fs = require("fs");
const path = require("path");
const secretFolderPath = path.resolve(__dirname,"../03-files-in-folder","./secret-folder");

const { stdout } = process;

fs.readdir(secretFolderPath, { withFileTypes: true }, function (error, element) {
  if (error) {
    throw error;
  } else {
    element.forEach(function (element) {
      if (element.isFile()) {
        const secretFile = path.resolve(secretFolderPath, element.name);
        fs.stat(secretFile, function (error, stats) {
          stdout.write(`Информация о файле: \r\n` + element.name.split(".")[0] + " - " + path.extname(secretFile).slice(1) + " - " + stats.size + " байт\r\n");
        });
      }
    });
  }
});