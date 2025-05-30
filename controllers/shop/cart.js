const Product = require('../../models/product');
const Cart = require('../../models/cart');
exports.getMyCart = (req, res, next) => {
    const cartItems = Cart.getCartItems();
    res.render('shop/cart', {
        cartItems: cartItems,
        hasCartItems: cartItems.length > 0,
        page_title: 'My Cart',
        route_name: 'shop.my_cart'
    });
}

exports.addToCart = (req, res, next) => {
    const productId = req.body.productId;
    const quantity = 1; // Default quantity to 1
    const product = Product.findById(productId);
    if(product) {
        Cart.addToCart(product, quantity);
        res.redirect('/my-cart');
    }

}