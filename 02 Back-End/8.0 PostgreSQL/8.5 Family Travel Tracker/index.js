import express from "express";
import bodyParser from "body-parser";
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

// * get data from database and return an array of users(include name color id)
async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  let users = [];
  result.rows.forEach((user) => {
    users.push(user);
  });
  console.log(users);
  return users;
}

// * get data from database and return an array of country codes
async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// * get home page
app.get("/", async (req, res) => {
  const countries = await checkVisited();
  const users = await getUsers();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});

app.post("/add", async (req, res) => {
  res.render("add.ejs");
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  currentUserId = req.body["user"];
  res.redirect("/");
});

// * insert new user to database and return id, name, color, then redirect to home page
app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const name = req.body["name"];
  const color = req.body["color"];
  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id, name, color;",
      [name, color]
    );
    currentUserId = result.rows[0].id;
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
