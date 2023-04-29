const { Schema, model } = require("mongoose");

const travelModel = new Schema({
  photo: String,
  country: { type: String, required: true },
  price: { type: Number, required: true },
  information: String,
  language: { type: String, enum: ['en', 'fr', 'es'], required: true },
  isDeleted: { type: Boolean, default: false }
});

module.exports = model("Trave", travelModel);
