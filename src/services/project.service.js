const httpStatus = require("http-status");
const { Project } = require("../models");
const ApiError = require("../utils/ApiError");

const createProject = async (projectBody) => {
  return Project.create(projectBody);
};

const queryProjects = async (filter, options) => {
  const projects = await Project.paginate(filter, options);
  return projects;
};

const getProjectById = async (id) => {
  return Project.findById(id);
};

const updateProjectById = async (projectId, updateBody) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
  Object.assign(project, updateBody);
  await project.save();
  return project;
};

const deleteProjectById = async (projectId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
  await project.remove();
  return project;
};

module.exports = {
  createProject,
  queryProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
