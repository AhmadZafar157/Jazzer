const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema(
  {
    Max_Stay_City: {
      type: [String],
      default: [null, null],
    },
    Max_Stay_Region: {
      type: [String],
      default: [null, null],
    },
    Revenue_30_Days: {
      type: [Number],
      default: [null, null],
    },
    Recharge_Average_Monthly: {
      type: [Number],
      default: [null, null],
    },
    Current_Balance: {
      type: [Number],
      default: [null, null],
    },
    RECHARGE_DORMANCY: {
      type: [Number],
      default: [null, null],
    },
    Favourite_Data_Product: {
      type: [String],
      default: [],
    },
    Favourite_Hybrid_Product: {
      type: [String],
      default: [],
    },
    Favourite_Voice_Product: {
      type: [String],
      default: [],
    },
    Dormant_2G: {
      type: [Number],
      default: [null, null],
    },
    Dormant_3G: {
      type: [Number],
      default: [null, null],
    },
    Dormant_4G: {
      type: [Number],
      default: [null, null],
    },
    sub_offering_group_w1: {
      type: String,
      default: '',
    },
    base_query: {
      type: String,
      required: true,
    },
    base_name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
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

const Base = mongoose.model('Base', baseSchema);

module.exports = Base;
