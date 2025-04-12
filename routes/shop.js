const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();
const adminData = require('./admin');

//Make sure exact match with / [GET]
router.get('/', (req, res, next) => {
    const products = adminData.products;
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', {prods: products, page_title: 'Shop', route_name: 'shop'});
});

module.exports = router;