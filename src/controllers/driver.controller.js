const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { driverService } = require("../services");

const createDriver = catchAsync(async (req, res) => {
  const driver = await driverService.createDriver(req.body);
  res.status(httpStatus.CREATED).send(driver);
});

const getDrivers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["email", "isActive"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await driverService.queryDrivers(filter, options);
  res.send(result);
});

// const getTasksForProject = catchAsync(async (req, res) => {
//   const result = await driverService.getTasksForProject(req.params.projectId);
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Tasks not found for projectid " + req.params.projectId);
//   }
//   res.send(result);
// });

const getDriver = catchAsync(async (req, res) => {
  const driver = await driverService.getDriverById(req.params.driverId);
  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, "driver not found for id " + req.params.driverId);
  }
  res.send(driver);
});

const updateDriver = catchAsync(async (req, res) => {
  console.log("driver id for update");
  console.log(req.params.driverId);
  const driver = await driverService.updateDriverById(req.params.driverId, req.body);
  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, "driver not found for id " + req.params.driverId);
  }
  res.send(driver);
});

const deleteDriver = catchAsync(async (req, res) => {
  await driverService.deleteDriverById(req.params.driverId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDriver,
  getDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
};
