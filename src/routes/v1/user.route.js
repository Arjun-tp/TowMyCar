const express = require('express');
const userController = require('../../controllers/user.controller');

const router = express.Router();


router.get('/getAllUsers', userController.getUsers)
router.post('/createUser', userController.createUser)
router.post('/loginUser', userController.loginUser)
router.get('/getOneUser/:userId', userController.getUser)
router.put('/updateUser/:userId', userController.updateUser)
router.get('/calculate', userController.calculateDistance);




module.exports = router;
