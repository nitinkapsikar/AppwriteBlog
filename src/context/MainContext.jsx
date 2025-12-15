import { createContext, useContext, useState, useEffect } from "react";
import { Account, Client } from "appwrite";

// 🔹 Appwrite setup
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

// 🔹 Create Context
const MainContext = createContext();

// 🔹 Provider Component
export const MainContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // ---------------------------
  // LOGIN FUNCTION
  // ---------------------------
  const loginUser = async (email, password) => {
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    setIsLoggedIn(true);
    setUserData(user);
  };

  // ---------------------------
  // LOGOUT FUNCTION
  // ---------------------------
  const logoutUser = async () => {
    await account.deleteSessions();
    setIsLoggedIn(false);
    setUserData(null);
  };

  // ---------------------------
  // AUTO LOGIN CHECK (on refresh)
  // ---------------------------
  const checkUser = async () => {
    try {
      const user = await account.get();
      setIsLoggedIn(true);
      setUserData(user);
    } catch {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <MainContext.Provider value={{ isLoggedIn, userData, loginUser, logoutUser }}>
      {children}
    </MainContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(MainContext);
