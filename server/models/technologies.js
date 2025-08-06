const mongoose = require('mongoose');

/* eslint-disable camelcase */
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
    ref: 'TechnologyType',
    required: true
  }
});
/* eslint-enable camelcase */

const Technology = mongoose.model('Technology', technologySchema);

module.exports = { Technology, technologySchema };

