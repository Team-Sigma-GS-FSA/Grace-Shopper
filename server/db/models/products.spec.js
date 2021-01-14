import {expect} from 'chai'
const {Product} = require('../models')

beforeEach(function() {
  let product = {
    name: 'testMask',
    price: 199.99,
    inventoryQuantity: 100,
    imageUrl:
      'https://i.picsum.photos/id/412/200/200.jpg?hmac=uEooNSqsBiLGg6Fwx10zkeVpge35EFeQ7bDQgmPfemI',
    description:
      'the most luxurious and expensive mask you will ever buy, ever!',
    category: 'luxury'
  }
})

describe('Sequelize Model', () => {
  it('has fields name, price, inventoryQuantity, imageUrl, description, category', async () => {
    expect(savedProduct.name).to.equal('mask1')
    expect(savedProduct.price).to.equal(199.99)
    expect(savedProduct.inventoryQuantity).to.equal(7)
    expect(savedProduct.imageUrl).to.equal(
      'https://i.picsum.photos/id/374/200/200.jpg?hmac=ifUjaLhaxfMlsBL7zHVuQ1YgZ1ECmNDNG8v0D9uHdIc'
    )
    expect(savedProduct.description).to.equal(
      'the most expensive mask you will ever buy'
    )
    expect(savedProduct.category).to.equal('luxury')
    expect(savedProduct.notARealAttribute).to.equal(undefined)
  })

  describe('name', () => {
    it('name is a string', async () => {
      const luxMask = await Product.create({name: 'LUXMASK'})
      expect(luxMask.name).to.equal(
        'LUXMASK',
        'Was not able to create a user with name LUXMASK'
      )
    })

    it('name cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      await expect(
        Product.create({}),
        "We shouldn't be able to create a product with no name"
      ).to.be.rejected
    })

    it('category can only be adult, child, luxury or misc (defaults to luxury)', async () => {
      product.category = 'luxury'
      try {
        const luxuryMaskProduct = await Product.create(product)
        if (luxuryMaskProduct) {
          throw Error('Validation should have failed with invalid category')
        }
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed')
      }
      delete product.category
      const defaultMaskProduct = await Product.create(product)
      expect(defaultMaskProduct.category).to.equal('luxury')
    })

    it('inventoryQuantity must be have a min value of 0', async () => {
      product.inventoryQuantity = -10
      try {
        const negativeMaskQuantity = await Product.create(product)
        if (negativeMaskQuantity) {
          throw Error('Validation should have failed with inventory < 0')
        }
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed')
      }

      delete product.inventoryQuantity
      const defaultMaskProductQuantity = await Product.create(product)
      expect(defaultMaskProductQuantity.inventoryQuantity).to.equal(0)
    })
  })
})
