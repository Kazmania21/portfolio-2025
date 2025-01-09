const mongoose = require('mongoose');

const projectUrlSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectUrlType',
    required: true
  },
  url: {
    type: String,
    required: true,
  }
});

const ProjectUrl = mongoose.model('ProjectUrl', projectUrlSchema);

module.exports = { projectUrlSchema, ProjectUrl };
