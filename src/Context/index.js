import { createContext, useReducer } from "react";

export const GlobalContext = createContext();

const initialState = {
  isLogin: false, //sementara
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "VERIFY_TOKEN":
      return null;
    default:
      return null;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};
