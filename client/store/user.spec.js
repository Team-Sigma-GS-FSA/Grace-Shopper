/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {
  me,
  logout,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser
} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET USER action', async () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].user).to.be.deep.equal(fakeUser)
    })
  })

  describe('logout', () => {
    xit('logout: eventually dispatches the REMOVE_USER action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_USER')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })

  describe('getAllUsers', () => {
    it('dispatches _getAllUsers', async () => {
      mockAxios.onGet('/api/users').replyOnce(200)
      await store.dispatch(getAllUsers())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_USERS')
      console.log(actions[0])
    })
  })
  describe('createUser', () => {
    it('dispatches _createUser', async () => {
      mockAxios.onPost('/api/users').replyOnce(201)
      await store.dispatch(createUser())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('CREATE_USER')
      console.log(actions[0])
    })
  })
  describe('deleteUser', () => {
    let fakeUser = {id: 9999, first: 'Dum', last: 'Eeh', email: 'asd@asd.asd'}
    it('dispatches _deleteUser', async () => {
      mockAxios.onDelete('/api/users/9999').replyOnce(204)
      await store.dispatch(deleteUser(fakeUser))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('DELETE_USER')
      console.log(actions[0])
    })
  })
  describe('updateUser', () => {
    let fakeUser = {id: 9999, first: 'Dumb', last: 'Eee', email: 'asd@asd.asd'}
    it('dispatches _updateUser', async () => {
      mockAxios.onPut('/api/users/9999').replyOnce(204)
      await store.dispatch(updateUser(fakeUser))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATE_USER')
      console.log(actions[0])
    })
  })
})
