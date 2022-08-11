const express = require('express');
const validate = require('../../middlewares/validate');
const driverController = require('../../controllers/driver.controller');

const router = express.Router();


router.get('/getAllDrivers', driverController.getDrivers)
router.post('/createDriver', driverController.createDriver)
router.get('/getOneDriver/:driverId', driverController.getDriver)
router.put('/updateDriver/:driverId', driverController.updateDriver)

module.exports = router;