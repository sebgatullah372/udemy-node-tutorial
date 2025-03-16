const express = require('express');

const router = express.Router();

router.use('/users', (req, res, next) => {
    res.send('<h1>Express Users Page</h1>')
});

router.use('/add-product', (req, res, next)=> {
    res.send('<form action="/product" method="POST"><input type="text" name="product"/><button type="submit">Add</button></form>');
});
router.use('/product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;