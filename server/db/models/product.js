const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    get() {
      return Number(this.getDataValue('price'));
    }
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
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
    defaultValue: 'luxury'
  }
});

module.exports = Product;
