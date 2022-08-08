const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();


router.get('/getAllUsers', userController.getUsers)
router.post('/createUser', userController.createUser)
router.post('/loginUser', userController.loginUser)
router.get('/getOneUser/:id', userController.getUser)



module.exports = router;
