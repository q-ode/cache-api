const mongoose = require('mongoose');

const { Schema } = mongoose;

const cacheSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('cache', cacheSchema);
