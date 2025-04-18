const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/add-product', productsController.create);
router.post('/add-product', productsController.store);

module.exports = router;