const router = require('express').Router();
const { User, Order, Product, OrderProduct } = require('../db/');

// GET /api/cart "All Cart Items"
router.get('/', async (req, res, next) => {
  try {
    const cart = await Product.findAll({
      include: {
        model: Order,
        where: { userId: req.user.id },
        through: {
          model: OrderProduct,
          where: {
            purchased: false
          }
        }
      }
    });
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

// POST /api/cart "Add Cart Items"
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.findorCreate({
      where: {
        userId: req.user.id
      },
      include: [
        {
          model: Product,
          through: {
            model: OrderProduct,
            where: {
              purchased: false
            }
          }
        }
      ]
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// PUT /api/cart "Update Cart Items"
// router.put('/cart', async (req, res, next) => {
//   try {
//     const order = await Order.findOne({
//       where: {
//         userId: req.user.id
//       },
//       include: [
//         {
//           model: Product,
//           through: {
//             model: OrderProduct,
//             where: {
//               orderId: req.body.order.id
//             }
//           }
//         }
//       ]
//     });

//     order = await order.update(req.body);

//     res.json(order);
//   } catch (error) {
//     next(error);
//   }
// });

// DELETE /api/cart/item "Delete Single Cart Item"
// router.delete('/item', async (req, res, next) => {
//   try {
//     const order = await Order.findOne({
//       where: {
//         userId: req.user.id
//       },
//       include: [
//         {
//           model: Product,
//           through: {
//             model: OrderProduct,
//             where: {
//               productId: req.body.id
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

// DELETE /api/cart "Delete All Cart Items"
router.delete('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findAll({
        where: { userId: req.user.id },
        include: {
          model: Product,
          required: true,
          through: {
            model: OrderProduct,
            where: {
              purchased: false
            }
          }
        }
      });

      await cart[0].destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
