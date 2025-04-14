const products = [];
exports.index = (req, res, next) => {
    res.render('shop', {prods: products, page_title: 'Shop', route_name: 'shop'});
}

exports.create = (req, res, next) => {
    res.render('add-product', { page_title: 'Add Product', route_name: 'admin.add-product'});
};

exports.store = (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/');
};