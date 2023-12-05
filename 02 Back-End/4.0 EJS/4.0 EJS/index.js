import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const today = new Date();
  const day = today.getDay();

  if (day === 0 || day === 6) {
    res.render("index.ejs", {
      day: "a weekend",
      doThings: "have some fun!",
    });
  } else {
    res.render("index.ejs", {
      day: "a weekday",
      doThings: "work hard!",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
