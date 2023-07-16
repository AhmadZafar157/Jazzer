const mongoose = require('mongoose');

const tdCredentialsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  database: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
});

const TDCredentials = mongoose.model('TDCredentials', tdCredentialsSchema);

module.exports = TDCredentials;
