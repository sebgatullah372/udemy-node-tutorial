const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();
const productsController = require('../controllers/products');

//Make sure exact match with / [GET]
router.get('/', productsController.index);

module.exports = router;