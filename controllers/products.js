const Product = require('../models/product');
exports.index = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop', {prods: products, page_title: 'Shop', route_name: 'shop'});
}

exports.create = (req, res, next) => {
    res.render('add-product', { page_title: 'Add Product', route_name: 'admin.add-product'});
};

exports.store = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};