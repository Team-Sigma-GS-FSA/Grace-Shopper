const router = require('express').Router();
const { Product, Order, OrderProduct } = require('../db/models');
const adminsOnly = require('../auth/adminsOnly');

// GET /api/products "All Products"
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: [
        'id',
        'name',
        'price',
        'imageUrl',
        'description',
        'category'
      ],
      include: [{ model: Order }]
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:productId "Single Product"
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [
        {
          model: Order
          // include: [OrderProduct],
        }
      ]
    });
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// POST /api/products "New Product"
router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
        name: req.body.name,
        price: req.body.price,
        inventoryQuantity: req.body.inventoryQuantity,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        category: req.body.category
      }
    });
    res.status(202).json(product);
  } catch (error) {
    next(error);
  }
});

// PUT /api/products/:productId "Update Product"
router.put('/:productId', adminsOnly, async (req, res, next) => {
  try {
    const { productId } = req.params;
    let product = await Product.findByPk(productId);

    product = await product.update(req.body);

    res.json(product);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/products/:productId "Delete Product"
router.delete('/:productId', adminsOnly, async (req, res, next) => {
  try {
    let product = await Product.destroy({
      where: {
        id: req.params.productId
      }
    });
    if (!product) {
      res.sendStatus(404).end();
    }
    res.sendStatus(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
