const mongoose = require("mongoose");
const mongooseStringQuery = require("mongoose-string-query");
const timestamps = require("mongoose-timestamp");

const CampaignSchema = new mongoose.Schema(
  {
    client_name: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    code_client: {
        type: String,
        required: true,
        trim: true,
    },
    start_date: {
        type: Date,
        required: true,
        trim: true
    },
    end_start: {
        type: Date,
        required: true,
        trim: true
    },
    facebook_ads: {
        type: Boolean
    },
    mobile_announce: {
        type: Boolean
    },
    sms_announce: {
        type: Boolean
    },
    facebook_ads_pro: {
        type: Boolean
    },
    description: {
        type: String
    },

  },
  { minimize: false }
);

CampaignSchema.plugin(timestamps);
CampaignSchema.plugin(mongooseStringQuery);

const Campaigns = mongoose.model("Campaigns", CampaignSchema);
module.exports = Campaigns;
