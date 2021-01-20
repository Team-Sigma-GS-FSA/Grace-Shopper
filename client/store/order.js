import axios from 'axios';
// import cart from '../components/cart';

//action types

const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_CART = 'UPDATE_CART';
const REMOVE_SINGLE_CART_ITEM = 'REMOVE_SINGLE_CART_ITEM';
const REMOVE_ALL_CART_ITEMS = 'REMOVE_ALL_CART_ITEMS';

const cartState = {
  user: {},
  cart: [],
  cartItem: {}
};

//action creators
const _getCart = (cart) => ({ type: GET_CART, cart });
const _addToCart = (cartItem) => ({ type: ADD_TO_CART, cartItem });
const _updateCart = (cart) => ({ type: UPDATE_CART, cart });
const _removeSingleCartItem = (cartItem) => ({
  type: REMOVE_SINGLE_CART_ITEM,
  cartItem
});
const _removeAllCartItems = () => ({ type: REMOVE_ALL_CART_ITEMS });

//Thunk creators
export const getCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/cart`);
    dispatch(_getCart(data));
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = (user, cartItem) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/users/${user.id}/cart`, cartItem);
    dispatch(_addToCart(data));
  } catch (error) {
    console.error(error);
  }
};

export const updateCart = (user, cart) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/users/${user.id}/cart`, cart);
    dispatch(_updateCart(data));
  } catch (error) {
    console.error(error);
  }
};

export const removeSingleCartItem = (user, cartItem) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/${user.id}/cart`, cartItem);
    dispatch(_removeSingleCartItem(cartItem));
  } catch (error) {
    console.error(error);
  }
};

export const removeAllCartItems = (user, cart) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/${user.id}/cart`);
    dispatch(_removeAllCartItems());
  } catch (error) {
    console.error(error);
  }
};

export default function (state = cartState, action) {
  switch (action.type) {
    case GET_CART:
      let userCart = [];

      for (let i = 0; i < action.cart.length; i++) {
        if (action.cart[i].products.length !== undefined) {
          for (let m = 0; m < action.cart[i].products.length; m++) {
            userCart.push(action.cart[i].products[m]);
          }
        }
      }
      return {
        ...state,
        cart: [...userCart]
      };
    case ADD_TO_CART:
      return { ...state, cart: [...cart, action.cartItem] };
    case UPDATE_CART:
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === action.cartItem.id ? action.cartItem : cartItem
        )
      };
    case REMOVE_SINGLE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem.id !== action.cartItem.id
        )
      };
    case REMOVE_ALL_CART_ITEMS:
      return { ...state, cart: [] };
    default:
      return cartState;
  }
}
