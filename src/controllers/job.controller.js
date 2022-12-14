const httpStatus = require("http-status");
const pick = require("../utils/pick");
const admin = require("firebase-admin");
const serviceAccount = require("../firebase.json");

const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { jobService } = require("../services");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });


const createJob = catchAsync(async (req, res) => {
  const job = await jobService.createJob(req.body);
  res.status(httpStatus.CREATED).send(job);
});

const getJobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["carType"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await jobService.queryJobs(filter, options);
  res.send(result);
});

// const getTasksForProject = catchAsync(async (req, res) => {
//   const result = await jobService.getTasksForProject(req.params.projectId);
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Tasks not found for projectid " + req.params.projectId);
//   }
//   res.send(result);
// });

const getJob = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, "job not found for id " + req.params.jobId);
  }
  res.send(job);
});

const updateJob = catchAsync(async (req, res) => {
  const tokens = [];
  // const { title, body, imageUrl } = req.body;
    // await admin.messaging().sendMulticast({
    //   tokens,
    //   notification: {
    //     title: "Job Updated",
    //     body: "Test Job"
    //   },
    // });
  console.log("job id for update");
  console.log(req.params.jobId);
  const job = await jobService.updateJobById(req.params.jobId, req.body);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, "job not found for id " + req.params.jobId);
  }
  res.send(job);
});

const deleteJob = catchAsync(async (req, res) => {
  await jobService.deleteJobById(req.params.jobId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createJob,
  getJobs,
  // getTasksForProject,
  getJob,
  updateJob,
  deleteJob,
};
