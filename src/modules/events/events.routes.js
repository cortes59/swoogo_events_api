const express = require('express');
const router = express.Router();
const controller = require('./events.controller')

router.get('/:id', controller.getById)

module.exports = router