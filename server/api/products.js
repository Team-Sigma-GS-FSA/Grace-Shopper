const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['name', 'price', 'imageUrl', 'description', 'category']
    })
    console.log('hello from the other side')
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.body.params.productId)
    res.send(product)
  } catch (err) {
    next(err)
  }
})

// POST /api/products
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.findOrCreate({
      where: {
        name: req.body.name,
        price: req.body.price,
        inventoryQuantity: req.body.inventoryQuantity,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        category: req.body.category
      }
    })
    res.send(product)
  } catch (err) {
    next(err)
  }
})

// PUT /api/products/productId
router.put('/productId', async (req, res, next) => {
  try {
    const {productId} = req.params
    let product = await Product.findByPk(productId)

    product = await product.update(req.body)

    res.send(product)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/products/productId
router.post('/productId', async (req, res, next) => {
  try {
    const {productId} = req.params
    const product = Product.findByPk(productId)
    await product.destroy()

    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
