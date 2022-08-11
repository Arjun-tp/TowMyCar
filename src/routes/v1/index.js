const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const carRoute = require('./car.route');
const jobRoute = require('./job.route');
const driverRoute = require('./driver.route');



const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/car',
    route: carRoute,
  },
  {
    path: '/driver',
    route: driverRoute,
  },
  {
    path: '/job',
    route: jobRoute,
  },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
