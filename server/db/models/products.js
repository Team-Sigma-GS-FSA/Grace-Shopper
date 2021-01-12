const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100
    }
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  },
  category: {
    type: Sequelize.ENUM('adult', 'kids', 'luxury', 'misc'),
    defaultValue: 'l'
  }
})

module.exports = User
