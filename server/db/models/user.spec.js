/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
// const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      xit('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      xit('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('User Fields', () => {
    let chad

    beforeEach(async () => {
      chad = await User.create({
        Name: 'Chad',
        Email: 'cdayton96@gmail.com',
        Type: 'consumer',
        Password: 'N0tMyP@ssword'
      })

      it('returns true if name is type string', () => {
        expect(chad.Name.to.equal('Chad'))
        expect(typeof chad.Name).to.equal('string')
      })
      it('returns true if email is not empty', () => {
        expect(chad.Email).to.have.lengthOf(18)
      })
      it('returns true if type is consumer or admin', () => {
        expect(chad.Type).to.equal('admin' || 'consumer')
      })
      it('returns true if password is not empty', () => {
        expect(chad.Password).to.have.lengthOf(12)
      })
    })
  })
}) // end describe('User model')
