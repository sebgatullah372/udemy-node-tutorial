const Product = require('../../models/product');
const Cart = require('../../models/cart');
const { User } = require('../../models');
exports.getMyCart = async (req, res, next) => {
    const user = await User.findByPk(req.session.user.id);
    user.getCart().then(cart => {
        if (!cart) {
            return res.render('shop/cart', {
                cartItems: [],
                hasCartItems: false,
                page_title: 'My Cart',
                route_name: 'shop.my_cart'
            });
        }
        return cart.getProducts().then(products => {
            if (products.length === 0) {
                return res.render('shop/cart', {
                    cartItems: [],
                    hasCartItems: false,
                    page_title: 'My Cart',
                    route_name: 'shop.my_cart'
                });
            }
            // Map the products to the desired structure
            const cartItems = products.map(product => {
                return {
                    id: product.id,
                    quantity: product.cart_product.quantity,
                    product: {
                        id: product.id,
                        title: product.title,
                        image_url: product.image_url,
                        price: product.price
                    }
                };
            });
            res.render('shop/cart', {
                cartItems: cartItems,
                hasCartItems: cartItems.length > 0,
                page_title: 'My Cart',
                route_name: 'shop.my_cart'
            });
        });
    }).catch(err => {
        console.error('Error fetching cart items:', err);
        return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
    });
    
   
}

exports.addToCart = async (req, res, next) => {
    const productId = req.body.productId;
     const user = await User.findByPk(req.session.user.id);
    let fetchedCart;
    user.getCart().then(cart => {
        if(!cart){
            return user.createCart();
        }
        return cart;
    }).then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where: {id: productId}});  
    }).then(products => {
        let product;
        if(products.length > 0){
            product = products[0];
        }
        if(product){
             // Product already exists in the cart, update quantity
             // Below is an alternative way to update the quantity
            // return product.cart_product.increment('quantity', {by: 1});
            // Using the fetched product from the cart
            // to get the current quantity and increment it    
            const oldQuantity = product.cart_product.quantity;
            return fetchedCart.addProduct(product, {through: {quantity: oldQuantity + 1}});
        } else {
            // Product does not exist in the cart, add it
            return Product.findByPk(productId).then(product => {
                return fetchedCart.addProduct(product, {through: {quantity: 1}});
            });
        }
    }).then(() => {
        res.redirect('/my-cart');
    }).catch(err => {
        console.error('Error adding product to cart:', err);
        return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
    });
    
}

exports.removeFromCart = async (req, res, next) => {
    const productId = req.body.productId;
     const user = await User.findByPk(req.session.user.id);
    user.getCart().then(cart => {
        if(!cart){
            return user.createCart();
        }
        return cart;
    }).then(cart => {
        return cart.getProducts({where: {id: productId}});
    }
    ).then(products => {
        if(products.length === 0){
            return res.status(404).render('404', { page_title: 'Product Not Found', route_name: 'error' });
        }
        const product = products[0];
        if(product.cart_product.quantity > 1){
            // If quantity is more than 1, just decrease the quantity
            return product.cart_product.decrement('quantity', {by: 1});
        } else {
            // If quantity is 1, remove the product from the cart
            return product.cart_product.destroy();
        }
    }).then(() => {
        res.redirect('/my-cart');
    }).catch(err => {
        console.error('Error removing product from cart:', err);
        return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
    });
}