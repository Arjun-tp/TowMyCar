const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const jobSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    projectId: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
      trim: true,
    },
    hours: {
      type: Number,
      required: true,
      trim: true,
    },
    endDate: {
      type: Date,
      required: true,
      trim: true,
    },
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
