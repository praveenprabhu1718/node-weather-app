const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars view engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home Page",
    name: "Praveen Chidambaram",
    message: "use this website to get your weather",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page", name: "Praveen Chidambaram" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Praveen Chidambaram",
    message: "Message from the app.js file",
  });
});

app.get("/weather", (req, res) => {
  const city = req.query.city;
  if (!city) {
    res.json({ error: "You must provide the city" });
    return;
  }

  geocode(city, (error, data) => {
    if (error) {
      console.log(error);
      return res.json({ error: "Invalid City name" });
    }

    const { latitude, longitude } = data;
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        console.log(error);
        return res.json({ error: "Error on getting coordinates" });
      }

      res.json({ ...forecastData, city });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error",
    name: "Praveen Chidambaram",
    message: "Help article not found",
    href: "/help",
    page: "Help",
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: "Error",
    name: "Praveen Chidambaram",
    message: "Page not found",
    href: "/",
    page: "Weather",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
