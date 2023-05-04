const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../01-read-file", "text.txt");
const myReadShort = fs.createReadStream(filePath);
myReadShort.on("data", (chunk) => {
  console.log(chunk.toString());
});