const mongoose = require('mongoose');

/* eslint-disable camelcase */
const projectUrlTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image_location: {
    type: String
  }
});
/* eslint-enable camelcase */

const ProjectUrlType = mongoose.model('ProjectUrlType', projectUrlTypeSchema);

module.exports = { projectUrlTypeSchema, ProjectUrlType };
