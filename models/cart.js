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

    static removeFromCart(product, quantity) {
        const existingItem = cartItems.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity -= quantity; // Update quantity if item already exists
            if( existingItem.quantity <= 0) {
                const itemIndex = cartItems.findIndex(item => item.product.id === product.id);
                if (itemIndex !== -1) {
                    cartItems.splice(itemIndex, 1); // Remove item from the cart if quantity is zero or less
                }
            }
        }
    }
    static getCartItems() {
        return cartItems; // Return all items in the cart
    }
}
module.exports = cartItem;