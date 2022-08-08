const httpStatus = require("http-status");
const { Task } = require("../models");
const ApiError = require("../utils/ApiError");

const createTask = async (TaskBody) => {
  return Task.create(TaskBody);
};

const queryTasks = async (filter, options) => {
  const tasks = await Task.paginate(filter, options);
  return tasks;
};

const getTasksForProject = async (projectId) => {
  return Task.find({ projectId: projectId });
};


const getTaskById = async (id) => {
  return Task.findById(id);
};

const updateTaskById = async (taskId, updateBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  Object.assign(task, updateBody);
  await task.save();
  return task;
};

const deleteTaskById = async (taskId) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  await task.remove();
  return task;
};

module.exports = {
  createTask,
  queryTasks,
  getTaskById,
  getTasksForProject,
  updateTaskById,
  deleteTaskById,
};
