import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { env } from "../config/config";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <UserContext.Provider
      value={{
        cartItem,
        setCartItem,
        count,
        setCount,
        total,
        setTotal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
