const Product = require('./product');
const User = require('./user');

Product.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
User.hasMany(Product, { foreignKey: 'user_id' });
module.exports = { Product, User };
