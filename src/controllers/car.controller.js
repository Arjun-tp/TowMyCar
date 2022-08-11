const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { carService } = require("../services");

const createCar = catchAsync(async (req, res) => {
  const car = await carService.createCar(req.body);
  res.status(httpStatus.CREATED).send(car);
});

const getCars = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["carType"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await carService.queryCars(filter, options);
  res.send(result);
});

// const getTasksForProject = catchAsync(async (req, res) => {
//   const result = await carService.getTasksForProject(req.params.projectId);
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Tasks not found for projectid " + req.params.projectId);
//   }
//   res.send(result);
// });

const getCar = catchAsync(async (req, res) => {
  const car = await carService.getCarById(req.params.carId);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, "car not found for id " + req.params.carId);
  }
  res.send(car);
});

const updateCar = catchAsync(async (req, res) => {
  console.log("car id for update");
  console.log(req.params.carId);
  const car = await carService.updateCarById(req.params.carId, req.body);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, "car not found for id " + req.params.carId);
  }
  res.send(car);
});

const deleteCar = catchAsync(async (req, res) => {
  await carService.deleteCarById(req.params.carId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
};
