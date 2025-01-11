const mongoose = require('mongoose');
const { projectUrlSchema } = require('./project_urls.js');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tagline: {
    type: String
  },
  urls: {
    type: [projectUrlSchema],
    required: true
  },
  technologies: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'Technology',
    required: true
  },
  image_location: {
    type: String,
    required: true
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = { Project, projectSchema };

