const { Schema, model, models } = require("mongoose");

//City model schema to display info
const CitySchema = new Schema({

  name: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  tip: {
    type: String,
    required: true,
  },

});

module.exports = models.City || model("City", CitySchema);
