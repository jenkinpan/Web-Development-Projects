import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Pan970628",
  port: 5432,
});

db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_country");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.;
  const countries = await checkVisited();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const code = req.body.country;
  await addCountry(code);
  res.redirect("/");
});

async function addCountry(code) {
  db.query(
    `INSERT INTO visited_country (country_code) values('${code}')`,
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res.err);
      }
    }
  );
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
