import { createContext, useState } from "react";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  return (
    <UserContext.Provider
      value={{ username, setUsername, isLogin, setIsLogin}}
    >
      {children}
    </UserContext.Provider>
  );
}
