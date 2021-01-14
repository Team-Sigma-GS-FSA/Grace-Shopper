/* global describe beforeEach it */

const {expect} = require('chai')
const {db} = require('../index')
const {Product} = require('../models')

describe.only('Product Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('data validation', () => {
    let savedProduct

    beforeEach(async () => {
      savedProduct = await Product.create({
        name: 'LuxMask',
        price: 900,
        inventoryQuantity: 100,
        imageUrl:
          'https://i.picsum.photos/id/995/200/200.jpg?hmac=C_VYf8uWBpaP3GWRI8MP0fMrXh0CR4Y9EgSf7hYhX1Ed',
        description: 'the must luxurious mask you will ever buy',
        category: 'luxury'
      })
    })

    it('has fields name, price, inventoryQuantity, imageUrl, description, category', () => {
      expect(savedProduct.name).to.equal('LuxMask')
      expect(savedProduct.price).to.equal(900)
      expect(savedProduct.inventoryQuantity).to.equal(100)
      expect(typeof savedProduct.name).to.equal('string')
      expect(savedProduct.description).to.equal(
        'the must luxurious mask you will ever buy'
      )
      expect(savedProduct.category).to.equal('luxury')
    })
  })

  it('returns true if name is type string', () => {
    expect(typeof luxMask.name).to.equal('string')
  })
  //         expect(luxMask.name).to.not.equal(null)
  //       })

  //       it('returns true if price is type number', () => {
  //         expect(typeof luxMask.price).to.equal('number')
  //       })

  //       it('returns true if inventoryQuantity is of type number and greater than 0', () => {
  //         expect(typeof luxMask.inventoryQuantity).to.equal('number')
  //         expect(luxMask.inventoryQuantity).to.be.gt(5)
  //       })

  //       it('returns true if imageUrl is type string', () => {
  //         expect(typeof luxMask.imageUrl).to.equal('string')
  //       })

  //       it('returns true if description is type string', () => {
  //         expect(typeof luxMask.description).to.equal('string')
  //       })

  //       it('returns true if category is type string and to equal luxury', () => {
  //         expect(typeof luxMask.category).to.equal('string')
  //         expect(luxMask.category.to.equal('luxury'))
  //       })
  // afterEach(() => db.sync({force: true}))
})
