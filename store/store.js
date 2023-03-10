import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ADD_TO_WISH_LIST, REMOVE_FROM_WISH_LIST } from './types';

let store;

const exampleInitialState = {
  wishlist: [],
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case ADD_TO_WISH_LIST:
      return {
        ...state,
        wishlist: state.wishlist.find((mv) => mv.id === action.payload.id)
          ? state.wishlist
          : [...state.wishlist, action.payload],
      };
    case REMOVE_FROM_WISH_LIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((mv) => mv.id !== action.id),
      };
    default:
      return state;
  }
};

// ACTIONS
export const addToWishlist = (payload) => {
  return { type: ADD_TO_WISH_LIST, payload };
};

export const removeFromWishlist = (id) => {
  return { type: REMOVE_FROM_WISH_LIST, id };
};

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['wishlist'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

function makeStore(initialState = exampleInitialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
