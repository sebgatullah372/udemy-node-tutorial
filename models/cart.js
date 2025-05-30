const cartItems = [];

const cartItem = class CartItem {
    constructor(product, quantity) {
        this.product = product; // Product object
        this.quantity = quantity; // Quantity of the product
    }
    static addToCart(product, quantity) {
        const existingItem = cartItems.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity; // Update quantity if item already exists
        } else {
            const newItem = new CartItem(product, quantity);
            cartItems.push(newItem); // Add new item to the cart
        }
    }
    static getCartItems() {
        return cartItems; // Return all items in the cart
    }
}
module.exports = cartItem;