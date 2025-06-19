const db = require('../utils/db_connection');
const cartItem = class CartItem {
    static async getCartItems() {
        const query = 'SELECT c.id, c.quantity, p.id AS product_id, p.title, p.image_url, p.price FROM cart c JOIN products p ON c.product_id = p.id';
        return await db.execute(query);
    }
    static async addToCart(productId, quantity) {
        const productLookupQuery = 'SELECT * FROM products WHERE id = ?';
        const [rows] = await db.execute(productLookupQuery, [productId]);
        if (rows.length === 0) {
            throw new Error('Product not found');
        }
        const cartLookupQury = 'SELECT * FROM cart WHERE product_id = ?';
        const [cartRows] = await db.execute(cartLookupQury, [productId]);
        if (cartRows.length > 0) {
            // If the product already exists in the cart, update the quantity
            const updateCartQuery = 'UPDATE cart SET quantity = quantity + ? WHERE product_id = ?';
            await db.execute(updateCartQuery, [quantity, productId]);
        } else {
            // If the product does not exist in the cart, insert a new item
            const insertCartQuery = 'INSERT INTO cart (product_id, quantity) VALUES (?, ?)';
            await db.execute(insertCartQuery, [productId, quantity]);
        }
    }

    static async removeFromCart(productId, quantity) {
        const productLookupQuery = 'SELECT * FROM products WHERE id = ?';
        const [rows] = await db.execute(productLookupQuery, [productId]);
        if (rows.length === 0) {
            throw new Error('Product not found');
        }
        const cartLookupQury = 'SELECT * FROM cart WHERE product_id = ?';
        const [cartRows] = await db.execute(cartLookupQury, [productId]);
        if (cartRows.length > 0) {
            // If the product exists in the cart, update the quantity
            const newQuantity = cartRows[0].quantity - quantity;
            if (newQuantity <= 0) {
                // If the new quantity is zero or less, delete the item from the cart
                const deleteCartQuery = 'DELETE FROM cart WHERE product_id = ?';
                await db.execute(deleteCartQuery, [productId]);
            } else {
                // Otherwise, just update the quantity
                const updateCartQuery = 'UPDATE cart SET quantity = ? WHERE product_id = ?';
                await db.execute(updateCartQuery, [newQuantity, productId]);
            }
        }
    }

}
module.exports = cartItem;