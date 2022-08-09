const httpStatus = require("http-status");
const { Driver } = require("../models");
const ApiError = require("../utils/ApiError");

const createDriver = async (driverBody) => {
  if (await Driver.isEmailTaken(driverBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return Driver.create(driverBody);
};

const loginDriver = async (driverBody) => {
  if (await Driver.isPasswordMatch(driverBody.email, driverBody.password)) {
    let email = driverBody.email;
    return getDriverByEmail(email);
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Not able to login");
  }
};


const queryDrivers = async (filter, options) => {
  const drivers = await Driver.paginate(filter, options);
  return drivers;
};

const getDriverById = async (id) => {
  return Driver.findById(id);
};

const getDriverByEmail = async (email) => {
  return Driver.findOne({ email });
};

const updateDriverById = async (driverId, updateBody) => {
  const driver = await getDriverById(driverId);
  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, "Driver not found");
  }
  if (updateBody.email && (await Driver.isEmailTaken(updateBody.email, driverId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(driver, updateBody);
  await driver.save();
  return driver;
};

const deleteDriverById = async (driverId) => {
  const driver = await getDriverById(driverId);
  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, "Driver not found");
  }
  await driver.remove();
  return driver;
};

module.exports = {
  createDriver,
  loginDriver,
  queryDrivers,
  getDriverById,
  getDriverByEmail,
  updateDriverById,
  deleteDriverById,
};
