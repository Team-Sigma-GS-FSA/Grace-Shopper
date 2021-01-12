const db = require('./db')
const User = require('./models/user')
const Product = require('./models/product')
const {Sequelize} = require('sequelize/types')

const Order = db.define('order', {
  orderId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {type: Sequelize.INTEGER, allowNull: false},
  purchased: {type: Sequelize.BOOLEAN},
  totalPrice: {type: Sequelize.FLOAT(2)},
  date: {type: Sequelize.DATEONLY},
})
User.belongsToMany(Product, {through: 'Order'})
Product.belongsToMany(User, {through: 'Order'})

module.exports = {db, User, Product, Order}
