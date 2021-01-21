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

    const addedProduct = await Product.findByPk(req.body.productId);

    await cart.addProduct(addedProduct);

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

    let editedProduct;

    await cart.products.forEach(async (product) => {
      if (product.id === req.body.productId) {
        editedProduct = product;
        await product.order_product.update({ quantity: req.body.quantity });
      }
    });

    res.json(editedProduct);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cart/item "Delete Single Cart Item"
router.delete('/', async (req, res, next) => {
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

    const deletedProduct = await Product.findByPk(req.body.productId);

    await cart.removeProduct(deletedProduct);

    cart = await cart.getProducts();
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
