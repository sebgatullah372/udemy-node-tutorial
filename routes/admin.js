const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();

router.use('/users', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'users.html'));
});

router.use('/add-product', (req, res, next)=> {
    // res.send('<form action="/product" method="POST"><input type="text" name="product"/><button type="submit">Add</button></form>');
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});
router.use('/product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;