import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUserName] = useState("");
  const [cart, setCart] = useState([]);
  const [upizzas, setUpizzas] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <UserContext.Provider
      value={{
        username,
        setUserName,
        cart,
        setCart,
        upizzas,
        setUpizzas,
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
