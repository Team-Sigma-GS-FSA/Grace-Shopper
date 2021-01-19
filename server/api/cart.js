// const router = require('express').Router();
// const { User, Order, Product, OrderProduct } = require('../db/');

// // GET /api/cart "All Cart Items"
// router.get('/', async (req, res, next) => {
//   try {
//     const order = await Order.findAll({
//       where: {
//         userId: req.user.id
//       },
//       include: [
//         {
//           model: Product,
//           through: {
//             model: OrderProduct,
//             where: {
//               purchased: false
//             }
//           }
//         }
//       ]
//     });
//     res.json(order);
//   } catch (error) {
//     next(error);
//   }
// });
