const { Sequelize } = require('sequelize');
const db = require('../db');

const OrderProduct = db.define('order_product', {
  quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  purchased: { type: Sequelize.BOOLEAN, defaultValue: false },
  totalPrice: { type: Sequelize.INTEGER, defaultValue: 0 },
  date: { type: Sequelize.DATEONLY }
});

module.exports = OrderProduct;
