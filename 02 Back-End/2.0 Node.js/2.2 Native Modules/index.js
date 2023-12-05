const fs = require("fs");

// ! use fs module to write a file
// fs.writeFile("hello.txt", "Hello from Node.js", (err) => {
//   if (err) throw err;
//   console.log("The file has been written!");
// });

// ! use fs module to read a file
fs.readFile("./hello.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
