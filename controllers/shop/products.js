const Product = require('../../models/product');
exports.index = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop/product-index', {prods: products, hasProducts: products.length > 0, page_title: 'Shop', route_name: 'shop.product_index'});
}

exports.show = (req, res, next) => {
    const id = req.params.id;
    const product = Product.findById(id);
    if (!product) {
        return res.status(404).render('404', { page_title: 'Product Not Found', route_name: 'error' });
    }
    res.render('shop/product-show', {product: product, page_title: 'Details ' + product.title, route_name: 'shop.product_show'});
}