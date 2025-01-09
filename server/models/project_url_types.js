const mongoose = require('mongoose');

const projectUrlTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image_location: {
    type: String
  }
});

const ProjectUrlType = mongoose.model('ProjectUrlType', projectUrlTypeSchema);

module.exports = { projectUrlTypeSchema, ProjectUrlType };
