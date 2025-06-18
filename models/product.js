const products = [];
const product = class Product {
    constructor(p){
        this.id = p.id;
        this.title = p.title;
        this.imageUrl = p.imageUrl;
        this.price = p.price;
        this.description = p.description;  
    }

    save() {
        products.push(this);
    }

    static fetchAll() {
        return products;
    }

    static findById(id) {
        return products.find(p => p.id === id);
    }

    update(p) {
        this.title = p.title;
        this.imageUrl = p.imageUrl;
        this.price = p.price;
        this.description = p.description;
    }
    static delete(id) {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products.splice(index, 1);
        }
    }
}

module.exports = product;