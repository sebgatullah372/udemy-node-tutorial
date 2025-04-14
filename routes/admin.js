const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();
const productsController = require('../controllers/products');

router.use('/users', (req, res, next) => { 
    res.sendFile(path.join(rootDir, 'views', 'users.html'));
});

router.get('/add-product', productsController.create);
router.post('/add-product', productsController.store);

module.exports = router;