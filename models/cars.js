

const mongoose = require("mongoose");


const carSchema = new mongoose.Schema({
    year: Number,
    make: String,
    model: String,
    horsepower: Number,
    
  });
  
  const Car = mongoose.model("Car", carSchema); // create model

  module.exports = Car;


  