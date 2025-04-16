const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
});

const Chef = mongoose.model("Chef", chefSchema);

module.exports = Chef;