/* global describe beforeEach it */

const { expect } = require('chai');
const { db } = require('../index');
const { Product } = require('../models');

describe.only('Product Model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('data validation', () => {
    let savedProduct;

    let testCategory = function (carouselCategory) {
      if (
        carouselCategory === 'adult' ||
        carouselCategory === 'kids' ||
        carouselCategory === 'luxury' ||
        carouselCategory === 'misc'
      ) {
        return true;
      } else {
        return false;
      }
    };

    beforeEach(async () => {
      savedProduct = await Product.create({
        name: 'LuxMask',
        price: 900,
        inventoryQuantity: 100,
        imageUrl:
          'https://i.picsum.photos/id/995/200/200.jpg?hmac=C_VYf8uWBpaP3GWRI8MP0fMrXh0CR4Y9EgSf7hYhX1Ed',
        description: 'the must luxurious mask you will ever buy',
        category: 'luxury'
      });
    });

    it('has fields name, price, inventoryQuantity, imageUrl, description, category', () => {
      expect(savedProduct.name).to.equal('LuxMask');
      expect(savedProduct.price).to.equal(900);
      expect(savedProduct.inventoryQuantity).to.equal(100);
      expect(typeof savedProduct.name).to.equal('string');
      expect(savedProduct.description).to.equal(
        'the must luxurious mask you will ever buy'
      );
      expect(savedProduct.category).to.equal('luxury');
    });

    it('returns true if name is type string', () => {
      expect(typeof savedProduct.name).to.equal('string');
    });

    it('returns true if name is not null', () => {
      expect(savedProduct.name).to.not.equal(null);
    });

    it('returns true if price is type number', () => {
      expect(typeof savedProduct.price).to.equal('number');
    });

    it('returns true if inventoryQuantity is of type number and greater than 0', () => {
      expect(typeof savedProduct.inventoryQuantity).to.equal('number');
      expect(savedProduct.inventoryQuantity).to.be.gt(0);
    });

    it('returns true if imageUrl is type string', () => {
      expect(typeof savedProduct.imageUrl).to.equal('string');
    });

    it('returns true if description is type string', () => {
      expect(typeof savedProduct.description).to.equal('string');
    });

    it('returns true if category is type string', () => {
      expect(typeof savedProduct.category).to.equal('string');
    });

    it('returns true if category is equal to adult, kids, luxury, misc', () => {
      expect(testCategory(savedProduct.category)).to.equal(true);
    });
  });
});
