'use strict';

const { db, User, Product, Order, OrderProduct } = require('../server/db');

const fs = require('fs');
const path = require('path');

const parseCsv = (csvData) => {
  const rows = csvData.split('\n');
  const keys = rows.shift().split(',');
  const parsedCsv = [];
  rows.forEach((row) => {
    if (row.length > 0) {
      const values = row.split(',');
      const newObj = {};
      keys.forEach((key, i) => {
        newObj[key] = values[i];
      });
      parsedCsv.push(newObj);
    }
  });
  return parsedCsv;
};

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log('db synced!');

    const userSeedCsv = fs.readFileSync(
      path.join(__dirname, '/userSeed.csv'),
      'utf-8'
    );
    const userSeedObjs = parseCsv(userSeedCsv);
    const users = await User.bulkCreate(userSeedObjs);
    console.log(`seeded ${users.length} users`);

    const productSeedCsv = fs.readFileSync(
      path.join(__dirname, '/productSeed.csv'),
      'utf-8'
    );
    const productSeedObjs = parseCsv(productSeedCsv);
    const products = await Product.bulkCreate(productSeedObjs);
    console.log(`seeded ${products.length} products`);

    const orderSeedCsv = fs.readFileSync(
      path.join(__dirname, '/orderSeed.csv'),
      'utf-8'
    );
    const orderSeedObjs = parseCsv(orderSeedCsv);
    const orders = await Order.bulkCreate(orderSeedObjs);
    console.log(`seeded ${orders.length} orders`);

    const orderProductSeedCsv = fs.readFileSync(
      path.join(__dirname, '/orderProductSeed.csv'),
      'utf-8'
    );
    const orderProductSeedObjs = parseCsv(orderProductSeedCsv);
    const orderProducts = await OrderProduct.bulkCreate(orderProductSeedObjs);
    console.log(`seeded ${orderProducts.length} order-product links`);

    console.log(`seeded successfully`);
  } catch (error) {
    console.error(error);
  }
};

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
