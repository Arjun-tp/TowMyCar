const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const carSchema = mongoose.Schema(
  {
    plateNo: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    make: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
carSchema.plugin(toJSON);
carSchema.plugin(paginate);

/**
 * @typedef Car
 */
const Car = mongoose.model("Car", carSchema);

module.exports = Car;
