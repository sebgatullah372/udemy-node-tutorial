const Product = require('../../models/product');
exports.index = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('admin/product-index', {prods: products, hasProducts: products.length > 0, page_title: 'Shop', route_name: 'admin.product_index'});
}

exports.create = (req, res, next) => {
    res.render('admin/add-product', { page_title: 'Add Product', route_name: 'admin.add-product'});
};

exports.store = (req, res, next) => {
    const newProduct = {
        id: String(Date.now() + Math.floor(Math.random() * 1000)),
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description
    }
    const product = new Product(newProduct);
    product.save();
    res.redirect('/');
};