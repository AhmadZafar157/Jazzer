const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    capping: {
      type: Number
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    stakeholderOptions: {
      type: [String],
      default: [],
    },
    maskingOptions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
