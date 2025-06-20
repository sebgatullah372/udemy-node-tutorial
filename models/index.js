const Product = require('./product');
const User = require('./user');
const Cart = require('./cart');
const CartProduct = require('./cart-product');

Product.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
User.hasMany(Product, { foreignKey: 'user_id' });

Cart.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsToMany(Product, {
    through: CartProduct,
    foreignKey: 'cart_id',
    otherKey: 'product_id'
});
Product.belongsToMany(Cart, {
    through: CartProduct,
    foreignKey: 'product_id',
    otherKey: 'cart_id'
});


module.exports = { Product, User , CartProduct};
