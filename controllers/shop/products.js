const Product = require('../../models/product');
exports.index = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop/product-index', {prods: products, hasProducts: products.length > 0, page_title: 'Shop', route_name: 'shop.product_index'});
}

exports.show = (req, res, next) => {
    const id = req.params.id;
    const product = Product.findById(id);
    console.log(product);
    res.render('shop/product-show', {product: product, page_title: 'Details ' + product.title, route_name: 'shop.product_show'});
}