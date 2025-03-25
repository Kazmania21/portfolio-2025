const mongoose = require('mongoose');

const metadataSchema = new mongoose.Schema({
  greeting: {
    type: String,
    required: true
  },
  bio: {
    type: String,
	required: true
  },
});

const Metadata = mongoose.model('Metadata', metadataSchema);

module.exports = { Metadata, metadataSchema };

