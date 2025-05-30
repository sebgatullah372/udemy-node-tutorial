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
}

module.exports = product;