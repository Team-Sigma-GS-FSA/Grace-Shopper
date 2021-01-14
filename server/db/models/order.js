const {Sequelize} = require('sequelize')
const db = require('./db')

const Order = db.define('order', {
  orderId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  quantity: {type: Sequelize.INTEGER, allowNull: false},
  purchased: {type: Sequelize.BOOLEAN},
  totalPrice: {type: Sequelize.INTEGER},
  date: {type: Sequelize.DATEONLY}
})

module.export = Order
