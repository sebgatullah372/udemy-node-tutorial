const Product = require('../../models/product');
exports.index = (req, res, next) => {
    Product.fetchAll().then(([products, _]) => {
        res.render('shop/product-index', {prods: products, hasProducts: products.length > 0, page_title: 'Shop', route_name: 'shop.product_index'});
    }).catch(err => {
        console.error('Error fetching products:', err);
        res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
    });
}

exports.show = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id).then(([rows, _]) => {
        const product = rows[0];
        
        if (!product) {
           return res.status(404).render('404', { page_title: 'Product Not Found', route_name: 'error' });
        }
        res.render('shop/product-show', { product: product, page_title: 'Details ' + product.title, route_name: 'shop.product_show' });
    }).catch(err => {
        console.error('Error fetching product:', err);
        return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
    });
   
}