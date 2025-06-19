const db = require('../utils/db_connection');
const product = class Product {
    static fetchAll() {
        const query = 'SELECT * FROM products';
        return db.execute(query); 
    }

    static findById(id) {
        const query = 'SELECT * FROM products WHERE id = ?';
        return db.execute(query, [id]);
    }

    static create(p) {
        const query = 'INSERT INTO products (title, image_url, price, description) VALUES (?, ?, ?, ?)';
        return db.execute(query, [p.title, p.imageUrl, p.price, p.description]);
    }

    static update(p , id) {
        const query = 'UPDATE products SET title = ?, image_url = ?, price = ?, description = ? WHERE id = ?';
        return db.execute(query, [p.title, p.imageUrl, p.price, p.description, id]);
    }
    static delete(id) {
        const query = 'DELETE FROM products WHERE id = ?';
        return db.execute(query, [id]);
    }
}

module.exports = product;