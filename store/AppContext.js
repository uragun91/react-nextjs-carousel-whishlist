import { createContext, useContext, useReducer } from 'react';
import { AppReducer, initialState } from './AppReducer';

// Initialize global store
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  // Hooked to a reducer function to access the store to manage states.
  const [globalState, globalDispatch] = useReducer(AppReducer, initialState);

  return (
    // The value is an object containing the key value pair of our states and
    // a dispatch function which helps to dispatch data to the reducer.
    // The reducer will eventually change our state. The value is
    // accessible to all descendants of this Provider, i.e. the entire
    // app, as GlobalStateProvider acts as a wrapper for the context we have
    // created in App.js.
    //
    // This renders the children components with children from the props.

    <AppContext.Provider value={{ globalDispatch, globalState }}>
      {children}
    </AppContext.Provider>
  );
};

export const Context = () => useContext(AppContext);

export default AppProvider;
