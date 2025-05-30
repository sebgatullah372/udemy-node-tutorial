const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();
const productsController = require('../controllers/shop/products');
const cartController = require('../controllers/shop/cart');

//Make sure exact match with / [GET]
// Products Routes
router.get('/', productsController.index);
router.get('/products/:id', productsController.show);

// Cart Routes
router.get('/my-cart', cartController.getMyCart);
router.post('/add-to-cart', cartController.addToCart);
router.post('/remove-from-cart', cartController.removeFromCart);

module.exports = router;