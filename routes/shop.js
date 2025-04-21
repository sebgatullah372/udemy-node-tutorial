const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();
const productsController = require('../controllers/shop/products');

//Make sure exact match with / [GET]
router.get('/', productsController.index);
router.get('/products/:id', productsController.show);

module.exports = router;