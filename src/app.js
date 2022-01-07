const path = require("path");
var hbs = require("hbs");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3000;
const date = new Date();
const year = date.getFullYear();
const day = date.toLocaleString(undefined, {
  weekday: "long",
});

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index.hbs", {
    title: "Weather App",
    year: year,
    day: day.slice(0, -3),
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/about", function (req, res) {
  res.render("about.hbs", {
    title: "About this project",
    year: year,
  });
});

app.get("*", function (req, res) {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found, please go back Home",
    year: year,
  });
});

app.listen(port, () => {
  console.log("Runing app on port " + port);
});
