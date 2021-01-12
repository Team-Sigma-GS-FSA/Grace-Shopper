// import {expect} from 'chai'
// import sinon from 'sinon'

// const app = require('../../index')
// const agent = require('supertest')(app)
// const {db} = require('../db')
// const {Product} = require('../models')

// describe('Product', () => {
//   const products = [{}, {}]

//   describe('Express API', () => {
//     const {findAll: productFindAll} = Product
//     beforeEach(() => {
//       Product.findAll = sinon.spy(() => Promise.resolve(products))
//     })
//     afterEach(() => {
//       Product.findAll = productFindAll
//     })

//     it('GET /api/products responds with all product', async () => {
//       const response = await agent.get('/api/products').expect(200)
//       expect(response.body).to.deep.equal(products)
//       expect(Product.findAll.calledOnce).to.be.equal(true)
//     })
//   })

//   describe('Sequelize Model', () => {
//     let product
//     before(() => db.sync({force: true}))
//     beforeEach(() => {
//       product = {}
//     })
//     afterEach(() => db.sync({force: true}))

//     it('has fields name, price, inventoryQuantity, imageUrl, description, category', async () => {
//       product.notARealAttribute = 'does not compute'
//       const savedProduct = await Product.create(product)
//       expect(savedProduct.name).to.equal('mask1')
//       expect(savedProduct.price).to.equal(88.34)
//       expect(savedProduct.inventoryQuantity).to.equal('electric')
//       expect(savedProduct.imageUrl).to.equal('/images/r2d2.png')
//       expect(savedProduct.description).to.equal(88.34)
//       expect(savedProduct.category).to.equal(88.34)
//       expect(savedProduct.notARealAttribute).to.equal(undefined)
//     })

//     describe('name', () => {
//         it('name is a string', async () => {
//           const luxMask = await Product.create({ name: 'LUXMASK' });
//           expect(luxMask.name).to.equal(
//             'LUXMASK',
//             'Was not able to create a user with name LUXMASK'
//           );
//         });

//         it('name cannot be null', async () => {
//           // We shouldn't be able to create a user without a name.
//           await expect(
//             Product.create({}),
//             "We shouldn't be able to create a product with no name"
//           ).to.be.rejected;
//         });

//     it('*** name cannot be null or an empty string', async () => {
//       const newProduct = Product.build()
//       try {
//         await newProduct.validate()
//         throw Error('validation should have failed without name')
//       } catch (err) {
//         expect(err.message).to.contain('name cannot be null')
//       }
//     })

//     it('category can only be adult, child, luxury or misc (defaults to luxury)', async () => {
//       product.category = 'luxury'
//       try {
//         const luxuryMaskProduct = await Product.create(product)
//         if (luxuryMaskProduct) {
//           throw Error('Validation should have failed with invalid category')
//         }
//       } catch (err) {
//         expect(err.message).to.not.have.string('Validation should have failed')
//       }
//       delete product.category
//       const defaultMaskProduct = await Product.create(product)
//       expect(defaultMaskProduct.category).to.equal('luxury')
//     })

//     it('inventoryQuantity must be have a min value of 0', async () => {
//       product.inventoryQuantity = -10
//       try {
//         const negativeMaskQuantity = await Product.create(product)
//         if (negativeMaskQuantity) {
//           throw Error('Validation should have failed with inventory < 0')
//         }
//       } catch (err) {
//         expect(err.message).to.not.have.string('Validation should have failed')
//       }

//       delete product.inventoryQuantity
//       const defaultMaskProductQuantity = await Product.create(product)
//       expect(defaultMaskProductQuantity.inventoryQuantity).to.equal(0)
//     })
//   })
// })
