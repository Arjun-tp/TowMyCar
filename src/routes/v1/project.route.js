const express = require('express');
const validate = require('../../middlewares/validate');
const projectController = require('../../controllers/project.controller');

const router = express.Router();


router.get('/getAllProjects', projectController.getprojects)
router.post('/createProject', projectController.createProject)
router.get('/getOneProject/:id', projectController.getproject)

module.exports = router;
