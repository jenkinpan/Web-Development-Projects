import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Me</h1> <p>My name is John Doe.</p>");
});

app.get("/contact", (req, res) => {
  res.send(
    '<h1>Contact Me</h1> <p>My email is<a href="mailto:jenkinpan@gmail.com">Gmail</a></p>'
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
