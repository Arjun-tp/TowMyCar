const httpStatus = require("http-status");
const { Job } = require("../models");
const ApiError = require("../utils/ApiError");

const createJob = async (JobBody) => {
  return Job.create(JobBody);
};

const queryJobs = async (filter, options) => {
  const jobs = await Job.paginate(filter, options);
  return jobs;
};

// const getTasksForProject = async (projectId) => {
//   return Job.find({ projectId: projectId });
// };


const getJobById = async (id) => {
  return Job.findById(id);
};

const updateJobById = async (jobId, updateBody) => {
  const job = await getJobById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, "Job not found");
  }
  Object.assign(job, updateBody);
  await job.save();
  return job;
};

const deleteJobById = async (jobId) => {
  const job = await getJobById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, "Job not found");
  }
  await job.remove();
  return job;
};

module.exports = {
  createJob,
  queryJobs,
  getJobById,
  // getTasksForProject,
  updateJobById,
  deleteJobById,
};
