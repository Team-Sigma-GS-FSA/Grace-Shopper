import axios from 'axios';
import cart from '../components/cart';

//action types

const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_CART = 'UPDATE_CART';
const REMOVE_SINGLE_CART_ITEM = 'REMOVE_SINGLE_CART_ITEM';
const REMOVE_ALL_CART_ITEMS = 'REMOVE_ALL_CART_ITEMS';
const SET_ORDER_ID = 'SET_ORDER_ID';

const cartState = {
  user: {},
  cart: [],
  cartItem: {},
  orderId: 0
};

//action creators
const _getCart = (cart) => ({ type: GET_CART, cart });
const _addToCart = (cartItem) => ({ type: ADD_TO_CART, cartItem });
const _updateCart = (cartItem) => ({ type: UPDATE_CART, cartItem });
const _removeSingleCartItem = (cartItem) => ({
  type: REMOVE_SINGLE_CART_ITEM,
  cartItem
});
const _removeAllCartItems = () => ({ type: REMOVE_ALL_CART_ITEMS });
const _setOrderId = (orderId) => ({ type: SET_ORDER_ID, orderId });

//Thunk creators
export const getCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/cart`);
    console.log(data);
    dispatch(_getCart(data));
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = (cartItem) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/cart`, cartItem);
    console.log('data in thunk addtocart', data);
    dispatch(_addToCart(data));
  } catch (error) {
    console.error(error);
  }
};

export const updateCart = (cartItem) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/cart`, cartItem);
    dispatch(_updateCart(data));
  } catch (error) {
    console.error(error);
  }
};

export const removeSingleCartItem = (cartItem) => async (dispatch) => {
  try {
    await axios.delete(`/api/cart/${cartItem.id}`, cartItem);
    dispatch(_removeSingleCartItem(cartItem));
  } catch (error) {
    console.error(error);
  }
};

export const removeAllCartItems = () => async (dispatch) => {
  try {
    await axios.delete(`/api/cart/all`);
    dispatch(_removeAllCartItems());
  } catch (error) {
    console.error(error);
  }
};

export const checkout = () => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/users/checkout`);
    dispatch(_removeAllCartItems());
    dispatch(_setOrderId(+data));
  } catch (error) {
    console.error(error);
  }
};

export default function (state = cartState, action) {
  switch (action.type) {
    case GET_CART:
      let userCart = action.cart;
      // for (let i = 0; i < action.cart.length; i++) {
      //   if (action.cart[i].products.length !== undefined) {
      //     for (let m = 0; m < action.cart[i].products.length; m++) {
      //       userCart.push(action.cart[i].products[m]);
      //     }
      //   }
      // }
      return {
        ...state,
        cart: [
          ...userCart
          // ...action.cart.map((cartItem) => {

          // })
        ]
      };
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.cartItem] };
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
    case SET_ORDER_ID:
      return { ...state, orderId: action.orderId };
    default:
      return state;
  }
}
