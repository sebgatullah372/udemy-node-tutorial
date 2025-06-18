const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();
const productsController = require('../controllers/admin/products');

router.get('/products', productsController.index);
router.get('/add-product', productsController.create);
router.post('/add-product', productsController.store);
router.get('/edit-product/:id', productsController.edit);
router.post('/edit-product/:id', productsController.update);
router.get('/delete-product/:id', productsController.delete);

module.exports = router;