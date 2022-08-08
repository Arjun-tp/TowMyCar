const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { projectService } = require("../services");

const createProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(req.body);
  res.status(httpStatus.CREATED).send(project);
});

const getprojects = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await projectService.queryProjects(filter, options);
  res.send(result);
});

const getproject = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
  res.send(project);
});

const updateproject = catchAsync(async (req, res) => {
  const project = await projectService.updateProjectById(
    req.params.projectId,
    req.body
  );
  res.send(project);
});

const deleteproject = catchAsync(async (req, res) => {
  await projectService.deleteProjectById(req.params.projectId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProject,
  getprojects,
  getproject,
  updateproject,
  deleteproject,
};
