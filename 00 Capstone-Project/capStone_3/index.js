import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const key = "";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/get-weather", async (req, res) => {
  try {
    const lat = req.body.lat;
    const lon = req.body.lon;
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    );
    res.render("index.ejs", { data: result.data, lat: lat, lon: lon });
  } catch (err) {
    console.log(err.response.data);
    res.render("index.ejs", { error: err.response.data });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}!`);
});
