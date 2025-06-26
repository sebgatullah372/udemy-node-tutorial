const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const {upload} = require('../utils/multer-file-config');
const isAuthenticated = require('../middleware/auth');
const router = express.Router();
const productsController = require('../controllers/admin/products');


router.use(isAuthenticated); // Apply authentication middleware to all admin routes
router.get('/products', productsController.index);
router.get('/add-product', productsController.create);
router.post('/add-product', upload.single('image'), productsController.store);
router.get('/edit-product/:id', productsController.edit);
router.post('/edit-product/:id',upload.single('image'), productsController.update);
router.get('/delete-product/:id', productsController.delete);

module.exports = router;