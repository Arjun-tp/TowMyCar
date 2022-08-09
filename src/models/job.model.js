const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const jobSchema = mongoose.Schema(
  {
    carType: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    driverId: {
      type: String,
      required: true,
      trim: true,
    },
    originLat: {
      type: String,
      required: true,
      trim: true,
    },
    originLng: {
      type: String,
      required: true,
      trim: true,
    },
    destLat: {
      type: String,
      required: true,
      trim: true,
    },
    destLng: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
