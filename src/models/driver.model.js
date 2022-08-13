const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");

const driverSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: "driver",
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      trim: true,
      default: false
    },
    driverLat: {
      type: String,
      trim: true,
    },
    driverLng: {
      type: String,
      trim: true,
    },
    fcmToken: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
driverSchema.plugin(toJSON);
driverSchema.plugin(paginate);

driverSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const driver = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!driver;
};

driverSchema.statics.isPasswordMatch = async function (email, password) {
  const driver = await this.findOne({ email });
  return bcrypt.compare(password, driver.password);
};

driverSchema.pre("save", async function (next) {
  const driver = this;
  if (driver.isModified("password")) {
    driver.password = await bcrypt.hash(driver.password, 8);
  }
  next();
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
