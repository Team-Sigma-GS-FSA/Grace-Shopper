const {expect} = require('chai')
const request = require('supertest')

const db = require('../db')
const app = require('../index')
const Product = require('../db/models')

const products = {
  name: '7up Diet 355 Ml',
  price: 144.04,
  inventoryQuantity: 79,
  imageUrl:
    'https://i.picsum.photos/id/416/200/200.jpg?hmac=QgMiXqHqKofoCv4h8lkrwRSOkn5Twkh15Dfl9Efvtwo',
  description:
    'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.',
  category: 'luxury'
}

describe('Products routes', () => {
  beforeEach(() => {
    return Product.create({
      name: '7up Diet 355 Ml',
      price: 144.04,
      inventoryQuantity: 79,
      imageUrl:
        'https://i.picsum.photos/id/416/200/200.jpg?hmac=QgMiXqHqKofoCv4h8lkrwRSOkn5Twkh15Dfl9Efvtwo',
      description:
        'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.',
      category: 'luxury'
    })
  })

  it('GET /api/products responds with all products', async () => {
    const response = await request(app)
      .get('/api/products')
      .expect(200)
    expect(response.body).to.deep.equal(products)
    expect(Product.findAll.calledOnce).to.be.equal(true)
  })
})
