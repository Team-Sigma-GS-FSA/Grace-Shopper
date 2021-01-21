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
    const user = req.user;
    let cart = await Order.findAll({
      where: {
        userId: user.id
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
    cart = cart.filter((order) => order.products.length > 0)[0];

    if (!cart) {
      cart = await user.createOrder({});
    }

    let addedProduct = await Product.findByPk(req.body.id);

    await cart.addProduct(addedProduct);
    addedProduct = await Product.findByPk(req.body.id, {
      include: [
        {
          model: Order,
          where: {
            userId: req.user.id
          },
          through: { model: OrderProduct, where: { purchased: false } }
        }
      ]
    });

    cart = await cart.getProducts();
    res.json(addedProduct);
  } catch (error) {
    next(error);
  }
});

// PUT /api/cart "Update Cart Items"
router.put('/', async (req, res, next) => {
  try {
    const user = req.user;
    let cart = await Order.findAll({
      where: {
        userId: user.id
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
    cart = cart.filter((order) => order.products.length > 0)[0];
    const orderId = cart.id;

    const orderProduct = await OrderProduct.findOne({
      where: {
        orderId: orderId,
        productId: req.body.id
      }
    });

    await orderProduct.update({ quantity: req.body.quantity });

    let editedProduct = await Product.findByPk(req.body.id, {
      include: [
        {
          model: Order,
          where: {
            userId: req.user.id
          },
          through: {
            model: OrderProduct,
            where: {
              purchased: false
            }
          }
        }
      ]
    });
    res.json(editedProduct);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cart/:productId "Delete Single Cart Item"
router.delete('/:productId', async (req, res, next) => {
  try {
    const user = req.user;
    let cart = await Order.findAll({
      where: {
        userId: user.id
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
    cart = cart.filter((order) => order.products.length > 0)[0];
    const orderId = cart.id;

    const orderProduct = await OrderProduct.findOne({
      where: {
        orderId: orderId,
        productId: +req.params.productId
      }
    });

    await orderProduct.destroy();

    const deletedProduct = await Product.findByPk(req.body.productId);

    // cart = await cart.getProducts();
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cart/all "Delete All Cart Items"
router.delete('/all', async (req, res, next) => {
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
