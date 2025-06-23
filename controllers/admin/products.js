const Product = require('../../models/product');
const errorHandler = require('../../utils/error-handler');
exports.index = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('admin/product-index', { prods: products, hasProducts: products.length > 0, page_title: 'Admin Products', route_name: 'admin.product_index' });
    }).catch(err => {
        console.error('Error fetching products:', err);
        errorHandler.handle500Error(err, req, res, next);
    });
}

exports.create = (req, res, next) => {
    res.render('admin/add-product', { page_title: 'Add Product', route_name: 'admin.add-product'});
};

exports.store = (req, res, next) => {
    const newProduct = {
        title: req.body.title,
        image_url: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description,
        user_id: req.session.user.id
    }
    Product.create(newProduct).then(() => {
        console.log('Product created successfully');
    }).catch(err => {
        errorHandler.handle500Error(err, req, res, next);
    });
    res.redirect('/');
};

exports.edit = (req, res, next) => {
    const id = req.params.id;
    Product.findByPk(id).then(product => {
        if (!product) {
            return res.status(404).render('404', { page_title: 'Product Not Found', route_name: 'error' });
        }
        res.render('admin/edit-product', { product: product, page_title: 'Edit Product', route_name: 'admin.edit-product' });
    }).catch(err => {
        errorHandler.handle500Error(err, req, res, next);
    });  
}

exports.update = (req, res, next) => {
    const id = req.params.id;
    
    Product.update(req.body, 
        {
            where : {id: id}
        }
    ).then(() => {
        console.log('Product updated successfully');
        res.redirect('/admin/products');
    }).catch(err => {
        errorHandler.handle500Error(err, req, res, next);
    });
    
}
exports.delete = (req, res, next) => {
    const id = req.params.id;
    Product.destroy( 
        {
            where : {id: id}
        }
    ).then(() => {
        console.log('Product deleted successfully');
        res.redirect('/admin/products');
    }).catch(err => {
        errorHandler.handle500Error(err, req, res, next);
    });
    
}