const Sequelize = require('sequelize');
const sequelize = require('../utils/db_connection');

const CartProduct = sequelize.define('cart_product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
}, {
    timestamps: true
});

module.exports = CartProduct;