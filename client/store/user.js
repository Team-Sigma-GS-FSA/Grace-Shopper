import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS';
const GET_USER = 'GET_USER';
const DELETE_USER = 'DELETE_USER';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {
  allUsers: [],
  user: {}
};

/**
 * ACTION CREATORS
 */
export const _getAllUsers = (users) => ({ type: GET_ALL_USERS, users });
export const _getUser = (user) => ({ type: GET_USER, user });
export const _deleteUser = (user) => ({ type: DELETE_USER, user });
export const _createUser = (user) => ({ type: CREATE_USER, user });
export const _updateUser = (user) => ({ type: UPDATE_USER, user });
export const _removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const getAllUsers = () => async (dispatch) => {
  const { data } = await axios.get('/api/users');
  dispatch(_getAllUsers(data));
};

export const getUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${user.id}`);
    dispatch(_getUser(data));
  } catch (error) {
    console.error(error);
  }
};

export const createUser = (user) => async (dispatch) => {
  const { data } = await axios.post('/api/users', user);
  dispatch(_createUser(data));
};
export const deleteUser = (user) => async (dispatch) => {
  await axios.delete(`/api/users/${user.id}`);
  dispatch(_deleteUser(user));
};
export const updateUser = (user) => async (dispatch) => {
  const { data } = await axios.put(`/api/users/${user.id}`, user);
  dispatch(_updateUser(data));
};

export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(_getUser(res.data || defaultUser.user));
    console.log('me fired');
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/home');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch(_removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    case GET_ALL_USERS:
      return { ...state, allUsers: [...allUsers, action.users] };
    case DELETE_USER:
      return state.allUsers.filter((user) => user.id !== action.user.id);
    case CREATE_USER:
      return { ...state, user: action.user };
    case UPDATE_USER:
      return state.allUsers.map((user) =>
        user.id === action.user.id ? action.user : user
      );
    case REMOVE_USER:
      return { ...state, user: {} };
    default:
      return state;
  }
}
