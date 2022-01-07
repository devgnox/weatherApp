const path = require("path");
var hbs = require("hbs");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
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

app.listen(3000, () => {
  console.log("Runing app on port 3000");
});
