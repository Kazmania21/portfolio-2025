const mongoose = require('mongoose');

const technologyTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const TechnologyType = mongoose.model('TechnologyType', technologyTypeSchema);

module.exports = { technologyTypeSchema, TechnologyType };
