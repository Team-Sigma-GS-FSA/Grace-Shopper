const { Sequelize } = require('sequelize');
const db = require('../db');

const OrderProduct = db.define('order_product', {
  quantity: { type: Sequelize.INTEGER, allowNull: false },
  purchased: { type: Sequelize.BOOLEAN },
  totalPrice: { type: Sequelize.INTEGER },
  date: { type: Sequelize.DATEONLY }
});

module.exports = OrderProduct;
