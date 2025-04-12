const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();

const products = [];
router.use('/users', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'users.html'));
});

router.get('/add-product', (req, res, next)=> {
    // res.send('<form action="/product" method="POST"><input type="text" name="product"/><button type="submit">Add</button></form>');
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', { page_title: 'Add Product', route_name: 'admin.add-product'});
});
router.post('/add-product', (req, res, next)=>{
    products.push({title: req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;