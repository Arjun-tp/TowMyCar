const httpStatus = require("http-status");
const { Car } = require("../models");
const ApiError = require("../utils/ApiError");

const createCar = async (carBody) => {
  return Car.create(carBody);
};

const queryCars = async (filter, options) => {
  const cars = await Car.paginate(filter, options);
  return cars;
};

const getCarById = async (id) => {
  return Car.findById(id);
};

const updateCarById = async (carId, updateBody) => {
  const car = await getCarById(carId);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, "Car not found");
  }
  Object.assign(car, updateBody);
  await car.save();
  return car;
};

const deleteCarById = async (carId) => {
  const car = await getCarById(carId);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, "Car not found");
  }
  await car.remove();
  return car;
};

module.exports = {
  createCar,
  queryCars,
  getCarById,
  updateCarById,
  deleteCarById,
};
