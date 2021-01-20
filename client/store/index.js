import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import products from './product';
import order from './order';

const reducer = combineReducers({
  user,
  products,
  order
});
const middleware =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(
        applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
      )
    : applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './product';
export * from './order';

//Because the file's name is order and we are exporting the reducer function directly, and we are using combinedReducers, the cart is being stored under the reducer. So to access the cart we have to use state.order.cart.
