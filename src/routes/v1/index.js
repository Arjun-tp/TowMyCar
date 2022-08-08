const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
// const projectRoute = require('./project.route');
const jobRoute = require('./job.route');


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
  // {
  //   path: '/project',
  //   route: projectRoute,
  // },
  {
    path: '/job',
    route: jobRoute,
  },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
