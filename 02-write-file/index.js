const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../02-write-file", "text.txt");

// const { stdout } = process;

const myNewFile = fs.createWriteStream(filePath, "utf8");
myNewFile.on("open", function () {
  process.stdout.write(`Hi! Enter your text: \r\n`);
});

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (input) {
  if (input.toString() === "exit") {
    rl.close();
  } else {
    process.stdout.write(`Enter your text again: \r\n`);
    myNewFile.write(`${input}\r\n`);
  }
});

process.on("exit", function () {
  process.stdout.write(`See you!`);
});