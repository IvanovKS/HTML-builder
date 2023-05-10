const fs = require("fs");
const path = require("path");
const folderPath = path.resolve(__dirname, "../04-copy-directory", "./files");
const newFolderPath = path.resolve(__dirname, "../04-copy-directory", "./files-copy");

const { stdout } = process;

fs.mkdir(newFolderPath, { recursive: true }, function (error) {
  if (error) {
    throw error;
  } else {
    fs.readdir(folderPath, { withFileTypes: true }, function (error, element) {
      if (error) {
        throw error;
      } else {
        element.forEach(function copyDir(element) {
          if (element.isFile()) {
            fs.promises.copyFile(path.join(folderPath, element.name), path.join(newFolderPath, element.name));
            stdout.write(`Сделано! Копия ${element.name} создана \r\n`);
          }
        });
      }
    });
  }
});

fs.watch(folderPath, function (eventType, filename) {
  if (eventType === "rename") {
    const filePath = path.join(newFolderPath, filename);
    fs.unlink(filePath, function (error) {
      if (error) {
        throw error;
      }
    });
  }
});
