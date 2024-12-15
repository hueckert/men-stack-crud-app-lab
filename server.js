
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new
const path = require("path");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

const Car = require("./models/cars.js");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 

app.use(express.static(path.join(__dirname, "public")));


app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/cars/new", (req, res) => {
    res.render("cars/new.ejs");
  });

app.get("/cars/:carId", async (req, res) => {
    const foundCar = await Car.findById(req.params.carId);
    res.render("cars/show.ejs", { car: foundCar });
  });
  
  

  // GET /fruits
app.get("/cars", async (req, res) => {
  const allCars = await Car.find();
  res.render("cars/index.ejs", { cars: allCars });
});

// POST /cars
app.post("/cars", async (req, res) => {
    console.log(req.body);
    await Car.create(req.body);
    res.redirect("/cars");
  });

  //Delete

app.delete("/cars/:carId", async (req, res) => {
    await Car.findByIdAndDelete(req.params.carId);
    res.redirect("/cars");
  });

// GET localhost:3000/fruits/:fruitId/edit
app.get("/cars/:carId/edit", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId);
  res.render("cars/edit.ejs", {
    car: foundCar
  });
});

// server.js

app.put("/cars/:carId", async (req, res) => {


  // Update the fruit in the database
  await Car.findByIdAndUpdate(req.params.carId, req.body);

  // Redirect to the fruit's show page to see the updates
  res.redirect(`/cars/${req.params.carId}`);
});

  

app.listen(3000, () => {
    console.log('Listening on port 3000');
});



