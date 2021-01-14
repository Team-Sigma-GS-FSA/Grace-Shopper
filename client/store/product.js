import axios from 'axios'
import {_deleteUser} from './user'

//action types

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

const productState = {
  allProducts: [],
  singleProduct: {}
}

//action creators
const _getProducts = products => ({type: GET_PRODUCTS, products})
const _getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})
const _createProduct = product => ({type: CREATE_PRODUCT, product})
const _updateProduct = product => ({type: UPDATE_PRODUCT, product})
const _deleteProduct = product => ({type: DELETE_PRODUCT, product})

//Thunk creators
export const getProducts = () => async dispatch => {
  const {data} = await axios.get('/api/products')
  dispatch(_getProducts(data))
}
export const getSingleProduct = product => async dispatch => {
  const {data} = await axios.get(`/api/products/${product.id}`)
  dispatch(_getSingleProduct(data))
}
export const createProduct = product => async dispatch => {
  const {data} = await axios.post('/api/products', product)
  dispatch(_createProduct(data))
}
export const updateProduct = product => async dispatch => {
  const {data} = await axios.put(`/api/products/${product.id}`, product)
  dispatch(_updateProduct(data))
}
export const deleteProduct = product => async dispatch => {
  await axios.delete(`/api/products/${product.id}`)
  dispatch(_deleteProduct(product))
}

export default function(state = productState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {...state, allProducts: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    case CREATE_PRODUCT:
      return {...state, allProducts: [...allProducts, action.product]}
    case UPDATE_PRODUCT:
      return state.allProducts.map(
        product => (product.id === action.product.id ? action.product : product)
      )
    case DELETE_PRODUCT:
      return state.allProducts.filter(
        product => product.id !== action.product.id
      )
    default:
      return productState
  }
}
