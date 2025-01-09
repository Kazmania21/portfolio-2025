const mongoose = require('mongoose');
const { projectUrlSchema } = require('./project_urls.js');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    ref: 'user',
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
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = { Project, projectSchema };

