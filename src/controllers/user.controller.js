const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, driverService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  console.log("request----", req.body)
  let user;
  if(req.body.role === 'driver') {
    user = await driverService.createDriver(req.body);
  } else {
    user = await userService.createUser(req.body);
  }
  res.status(httpStatus.CREATED).send(user);
});

const loginUser = catchAsync(async (req, res) => {
  console.log("Login----", req.body)
  const user = await userService.loginUser(req.body);
  res.status(httpStatus.OK).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
