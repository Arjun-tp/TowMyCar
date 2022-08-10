const express = require('express');
const jobController = require('../../controllers/job.controller');


const router = express.Router();


router.get('/getAllJobs', jobController.getJobs)
// router.get('/getAllJobsForProject/:projectId', jobController.getTasksForProject)
router.post('/createJob', jobController.createJob)
router.post('/updateJob/:taskId', jobController.updateJob)
router.get('/getOneJob/:jobId', jobController.getJob)


module.exports = router;
