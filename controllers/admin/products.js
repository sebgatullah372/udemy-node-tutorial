const { where } = require('sequelize');
const Product = require('../../models/product');
exports.index = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('admin/product-index', { prods: products, hasProducts: products.length > 0, page_title: 'Admin Products', route_name: 'admin.product_index' });
    }).catch(err => {
        console.error('Error fetching products:', err);
        return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
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
        user_id: req.user.id
    }
    Product.create(newProduct).then(() => {
        console.log('Product created successfully');
    }).catch(err => {
        console.error('Error creating product:', err);
        return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
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
        console.error('Error fetching product:', err);
        return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
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
        console.error('Error updating product:', err);
        return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
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
        console.error('Error deleting product:', err);
        return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
    });
    
}