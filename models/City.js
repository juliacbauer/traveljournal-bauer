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
  
  attraction1: {
    type: String,
  },

  attraction2: {
    type: String,
  },

  attraction3: {
    type: String,
  },

  attraction4: {
    type: String,
  },

  attraction5: {
    type: String
  }

});

module.exports = models.City || model("City", CitySchema);
