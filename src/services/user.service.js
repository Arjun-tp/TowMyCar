const httpStatus = require("http-status");
const { User, Driver } = require("../models");
const ApiError = require("../utils/ApiError");
const {getDriverByEmail} = require("../services/driver.service")

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return User.create(userBody);
};

const loginUser = async (userBody) => {
  let findDriver = await getDriverByEmail(userBody.email);
  if(findDriver) {
    if (await Driver.isPasswordMatch(userBody.email, userBody.password)) {
      let email = userBody.email;
      return getDriverByEmail(email);
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Not able to login");
    }
  }

  let findUser = await getUserByEmail(userBody.email);
  if(findUser) {
    if (await User.isPasswordMatch(userBody.email, userBody.password)) {
      let email = userBody.email;
     
      return getUserByEmail(email);
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Not able to login");
    }
  }
};


const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  loginUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
