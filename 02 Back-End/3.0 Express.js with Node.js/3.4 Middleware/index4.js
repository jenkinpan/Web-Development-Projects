import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

function generateBandName(req, res, next) {
  req.body.bandName = req.body.street + req.body.pet;
  next();
}

app.use(generateBandName);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send(`<h1>This is your Band Name</h1><h2>${req.body.bandName}✌️</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
