

const mongoose = require("mongoose");


const carsSchema = new mongoose.Schema({
    Year: Number,
    Make: String,
    Model: String,
    Horsepower: Number,
    
  });
  
  const Cars = mongoose.model("Car", carsSchema); // create model

  module.exports = Cars;


  