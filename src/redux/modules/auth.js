import cookie from 'react-cookie';

const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';
const LOAD_AUTH_COOKIE = 'redux-example/auth/LOAD_AUTH_COOKIE';
const AUTO_LOGOUT = 'redux-example/auth/AUTO_LOGOUT';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log('load success');
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result.user
      };
    case LOAD_FAIL:
      console.log('load fail');
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      const data = action.result;
      cookie.save('user', data.user);
      cookie.save('token', data.token);
      return {
        ...state,
        loggingIn: false,
        user: data.user
      };
    case LOGIN_FAIL:
      console.log('login result fail');
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
    case AUTO_LOGOUT:
      cookie.remove('token');
      cookie.remove('user');
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    // Add a new action to load the authentication state from your cookie
    case LOAD_AUTH_COOKIE:
      let user = cookie.load('user');
      user = user ? user : null;
      return {
        ...state,
        user
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/profile')
  };
}

export function login(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        email: email,
        password: password
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}

export function loadAuthCookie() {
  return {
    type: LOAD_AUTH_COOKIE
  };
}

export function autoLogout() {
  return {
    type: AUTO_LOGOUT,
  };
}
