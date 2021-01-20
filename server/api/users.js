const router = require('express').Router();
const { User, Order, Product, OrderProduct } = require('../db/');
const adminsOnly = require('../auth/adminsOnly');
const userOrAdminOnly = require('../auth/userOrAdminOnly');

//router.use(`/api/users/:userId/cart`, require('./cart'));

// GET /api/users "All Users"
router.get('/', adminsOnly, async (req, res, next) => {
  try {
    let user = await User.findAll({
      include: [
        {
          model: Order,
          include: [Product]
        }
      ]
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/checkout
router.post('/checkout', async (req, res, next) => {
  try {
    // Different behaviors if the person is a guest or logged in
    if (req.user) {
      const userId = req.user.id;

      const cart = await Product.findAll({
        include: {
          model: Order,
          where: { userId: userId },
          through: {
            model: OrderProduct,
            purchased: false
          }
        }
      });
      await cart.forEach((product) => {
        product.orders.forEach(async (order) => {
          await order.order_product.update({ purchased: true });
        });
      });
      const orderNumber = cart[0].orders[0].id;
      res.send('' + orderNumber);
    } else {
      // Create a new guest user in database
      const guestNum = (await User.findAll()).length + 1;
      const guestUser = await User.create({
        firstName: `Guest ${guestNum}`,
        lastName: `Last ${guestNum}`,
        type: 'consumer',
        email: `guest${guestNum}@email.com`,
        cardType: 'visa',
        cardExpMonth: '01',
        cardExpYear: '21'
      });
      // Create a new order in the database
      // TODO: Add products to it, using req.body
      await guestUser.createOrder({});
      const guestOrder = (await guestUser.getOrders())[0];
      res.send('' + guestOrder.id);
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/users/cart
router.get('/cart', async (req, res, next) => {
  try {
    const order = await Order.findAll({
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
        // include: [
        //   {
        //     model: Order,
        //     include: [
        //       {
        //         model: Product,
        //         through: { model: OrderProduct, where: { purchased: false } }
        //       }
        //     ]
        //   }
        // ]
      ]
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:userId "Single User"
router.get('/:userId', userOrAdminOnly, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [
        {
          model: Order,
          include: [{ model: Product, through: OrderProduct }]
        }
      ]
    });
    if (!user) {
      res.sendStatus(404).end();
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/ "New User"
router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country,
        cardType: req.body.cardType,
        cardNumber: req.body.cardNumber,
        cardExpMonth: req.body.cardExpMonth,
        cardExpYear: req.body.cardExpYear
      }
    });
    res.sendStatus(204).json(user);
  } catch (error) {
    next(error);
  }
});

// PUT / api/users/:userId "Update User"
router.put('/:userId', userOrAdminOnly, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      res.sendStatus(404).end();
    }
    await user.update(req.body);
    res.status(202).send(user);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:userId "Delete User"
router.delete('/:userId', userOrAdminOnly, async (req, res, next) => {
  try {
    let user = await User.destroy({
      where: {
        id: req.params.userId
      }
    });
    if (!user) {
      res.sendStatus(404).end();
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

//User - Cart

//GET /api/users/:userId/cart  Cart items for $:id User
router.get('/:userId/cart', async (req, res, next) => {
  try {
    let cart = await User.findByPk(req.params.userId, {
      include: [
        {
          model: Order,
          include: [
            {
              model: Product,
              through: { model: OrderProduct, where: { purchased: false } }
            }
          ]
        }
      ]
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

//POST /api/users/:userId/cart Add item to cart
//take in (itemId, qty) => Product.find() => item
router.post('/:userId/cart', async (req, res, next) => {
  try {
    let item = await Product.findByPk(req.body.id);

    res.send(item);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/users/:userId/cart DELETE item from cart
router.delete('/:userId/cart', async (req, res, next) => {
  try {
    let item = await Product.destroy({
      where: {
        id: req.body.id
      }
    });
    if (!item) {
      res.sendStatus(404).end();
    }
    res.sendStatus(204).end();
  } catch (error) {
    next(error);
  }
});

router.put('/:userId/cart', async (req, res, next) => {
  try {
    let item = await Product.findByPk(req.body.id);

    item = await item.update(req.body);

    res.send(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
