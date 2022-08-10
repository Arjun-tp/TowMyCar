const express = require('express');
const validate = require('../../middlewares/validate');
const carController = require('../../controllers/car.controller');

const router = express.Router();


router.get('/getAllCars', carController.getCars)
router.post('/createCar', carController.createCar)
router.get('/getOneCar/:id', carController.getCar)

module.exports = router;
