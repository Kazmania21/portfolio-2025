const mongoose = require('mongoose');

const projectTagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true
  },
  projects: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'Project',
    required: false
  }
});

const ProjectTag = mongoose.model('ProjectTag', projectTagSchema);

module.exports = { ProjectTag, projectTagSchema };

