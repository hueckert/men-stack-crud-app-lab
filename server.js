
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
// GET /
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

const Car = require("./models/cars.js");

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/cars/new", (req, res) => {
    res.render("cars/new.ejs");
  });

// POST /cars
app.post("/cars", async (req, res) => {
    console.log(req.body);
    await Car.create(req.body);
    res.redirect("/cars/new");
  });

app.listen(3000, () => {
    console.log('Listening on port 3000');
});



