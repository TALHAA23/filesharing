import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../assets/firebase";
const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, [auth]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
