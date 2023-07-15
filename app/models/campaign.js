const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    BROADCAST_DATE: {
      type: Date,
      required: true,
      default: Date
    },
    MASKING: {
      type: String,
      enum: ['Jazz', 'JAZZ'],
      required: true,
    },
    stakeholder: {
      type: String,
      enum: ['adhoc', 'ADHOC'],
      required: true,
    },
    time_stamp: {
      type: Date,
      default: Date.now,
    },
    campaign_name: {
      type: String,
      enum: ['Postpaid', 'Prepaid'],
      required: true,
    },
    channel: {
      type: String,
      enum: ['SMS', 'CALL'],
      required: true,
    },
    TABLE_NAME: {
      type: String,
      required: true,
    },
    base_list: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ['In Progress', 'Executed', 'Existing'],
      default: 'Existing',
      required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
