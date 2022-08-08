const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { taskService } = require("../services");

const createJob = catchAsync(async (req, res) => {
  const task = await taskService.createJob(req.body);
  res.status(httpStatus.CREATED).send(task);
});

const getTasks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await taskService.queryTasks(filter, options);
  res.send(result);
});

const getTasksForProject = catchAsync(async (req, res) => {
  const result = await taskService.getTasksForProject(req.params.projectId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tasks not found for projectid " + req.params.projectId);
  }
  res.send(result);
});

const getTask = catchAsync(async (req, res) => {
  const task = await taskService.getTaskById(req.params.taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found for id " + req.params.taskId);
  }
  res.send(project);
});

const updateTask = catchAsync(async (req, res) => {
  console.log("Task id for update");
  console.log(req.params.taskId);
  const task = await taskService.updateTaskById(req.params.taskId, req.body);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found for id " + req.params.taskId);
  }
  res.send(task);
});

const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTaskById(req.params.taskId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createJob,
  getTasks,
  getTasksForProject,
  getTask,
  updateTask,
  deleteTask,
};
