const router = require('express').Router();
const { User, Order, Product, OrderProduct } = require('../db/');
const adminsOnly = require('../auth/adminsOnly');

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

// GET /api/users/:userId "Single User"
router.get('/:userId', async (req, res, next) => {
  if (req.user && req.user.id === +req.params.userId) {
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
  } else {
    res.sendStatus(401);
  }
});

// GET /api/users/:userId/cart "Single User's Cart"
router.get('/:userId/cart', async (req, res, next) => {
  if (req.user && req.user.id === +req.params.userId) {
    try {
      const user = await User.findByPk(req.params.userId, {
        include: [
          {
            model: Order,
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
  } else {
    res.sendStatus(401);
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
router.put('/:userId', async (req, res, next) => {
  if (req.user && req.user.id === +req.params.userId) {
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
  } else {
    res.sendStatus(401);
  }
});

// DELETE /api/users/:userId "Delete User"
router.delete('/:userId', async (req, res, next) => {
  if (req.user && req.user.id === +req.params.userId) {
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
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
