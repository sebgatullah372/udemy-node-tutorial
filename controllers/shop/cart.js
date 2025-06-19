const Product = require('../../models/product');
const Cart = require('../../models/cart');
exports.getMyCart = (req, res, next) => {
    Cart.getCartItems().then(([cartItems, _]) => {
        if (!cartItems || cartItems.length === 0) {
            return res.render('shop/cart', {
                cartItems: [],
                hasCartItems: false,
                page_title: 'My Cart',
                route_name: 'shop.my_cart'
            });
        }
        // Map the cart items to the desired structure
        cartItems = cartItems.map(item => {
            return {
                id: item.id,
                quantity: item.quantity,
                product: {
                    id: item.product_id,
                    title: item.title,
                    image_url: item.image_url,
                    price: item.price
                }
            };
        });
        
        res.render('shop/cart', {
        cartItems: cartItems,
        hasCartItems: cartItems.length > 0,
        page_title: 'My Cart',
        route_name: 'shop.my_cart'
    });
    }).catch(err => {
        console.error('Error fetching cart items:', err);
        return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
    });
    
   
}

exports.addToCart = async (req, res, next) => {
    const productId = req.body.productId;
    const quantity = 1; // Default quantity to 1
    await Cart.addToCart(productId, quantity);
    res.redirect('/my-cart');
}

exports.removeFromCart = async (req, res, next) => {
    const productId = req.body.productId;
    const quantity = 1;
    await Cart.removeFromCart(productId, quantity);
    res.redirect('/my-cart');
}