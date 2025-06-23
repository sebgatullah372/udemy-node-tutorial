const Product = require('../../models/product');
const errorHandler = require('../../utils/error-handler');
exports.index = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/product-index', {prods: products, hasProducts: products.length > 0, page_title: 'Shop', route_name: 'shop.product_index'});
    }).catch(err => {
        console.error('Error fetching products:', err);
        errorHandler.handle500Error(err, req, res, next);
    });
}

exports.show = (req, res, next) => {
    const id = req.params.id;
    Product.findByPk(id).then(product => {
        if (!product) {
           return res.status(404).render('404', { page_title: 'Product Not Found', route_name: 'error' });
        }
        res.render('shop/product-show', { product: product, page_title: 'Details ' + product.title, route_name: 'shop.product_show' });
    }).catch(err => {
        console.error('Error fetching product:', err);
        errorHandler.handle500Error(err, req, res, next);
    });
   
}