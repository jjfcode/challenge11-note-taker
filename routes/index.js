const router = require('express').Router();
const htmlRoute = require('./html/index');
const apiRoute = require('./api/index');

router.use('/api', apiRoute);

router.use('/', htmlRoute);

module.exports = router;