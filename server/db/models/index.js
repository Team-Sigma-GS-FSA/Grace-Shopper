const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const OrderProduct = require('./order_product');

// User has 1:m with orders
User.hasMany(Order);

// Product m:m with order, through OrderProduct
Product.belongsToMany(Order, { through: OrderProduct });
Order.belongsToMany(Product, { through: OrderProduct });

module.exports = {
  User,
  Product,
  Order,
  OrderProduct
};
