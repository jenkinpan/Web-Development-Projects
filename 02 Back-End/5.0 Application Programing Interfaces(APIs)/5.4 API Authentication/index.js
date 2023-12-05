import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "jenkin";
const yourPassword = "Pan970628";
const yourAPIKey = "";
const yourBearerToken = "f7fcdad8-f264-4ab3-8334-d600385964db";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  try {
    const response = await axios.get(`${API_URL}/random`);
    const data = response.data;
    res.render("index.ejs", { content: JSON.stringify(data) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  try {
    const response = await axios.get(`${API_URL}/all?page=2`, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const data = response.data;
    res.render("index.ejs", { content: JSON.stringify(data) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  try {
    const response = await axios.get(`${API_URL}/filter`, {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    const data = response.data;
    res.render("index.ejs", { content: JSON.stringify(data) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  const id = 42;
  try {
    const response = await axios.get(`${API_URL}/secrets/${id}`, {
      headers: { Authorization: `Bearer ${yourBearerToken}` },
    });
    const data = response.data;
    res.render("index.ejs", { content: JSON.stringify(data) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
