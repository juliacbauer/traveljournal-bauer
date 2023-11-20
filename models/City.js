const { Schema, model, models } = require("mongoose");

const CitySchema = new Schema({
    name: {
        type: String,
      },

      description: {
        type: String,
      },
      
      tip: {
        type: String,
      },
});
  
module.exports = models.City || model("City", CitySchema);