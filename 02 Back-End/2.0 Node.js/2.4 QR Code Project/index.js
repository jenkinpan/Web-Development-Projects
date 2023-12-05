/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "input",
      name: "url",
      message: "What is the URL?",
    },
  ])
.then((answers) => {
    const inputUrl = answers.url;
    var qr_png = qr.image(inputUrl, { type: "png" });
    qr_png.pipe(fs.createWriteStream("qr-image.png"));
    console.log("The QR file has been written!");
    
    fs.writeFile("url.txt", inputUrl, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    });

})
.catch((error) => {
    if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
    } else {
        // Something else went wrong
    }
});
        
