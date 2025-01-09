const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  image_location: {
    type: String, 
    required: true
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Technology = mongoose.model('Technology', technologySchema);

module.exports = { Technology, technologySchema };

