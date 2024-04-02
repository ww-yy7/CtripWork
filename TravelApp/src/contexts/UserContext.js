import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, createContext } from "react";

export const UserContext = createContext({});

function UserProvider({ children }) {
  const [token, setToken] = useState("");
  const [id, setID] = useState("");

  // 将 id 存储在本地缓存中
  const saveIDToStorage = async (idValue) => {
    try {
      await AsyncStorage.setItem("id", idValue);
      setID(idValue);
    } catch (error) {
      console.error("id值没有存储", error);
    }
  };
  // 将 token 存储在本地缓存中
  const saveTokenToStorage = async (tokenValue) => {
    try {
      await AsyncStorage.setItem("token", tokenValue);
      // console.log(tokenValue, "token已存储");
      setToken(tokenValue);
    } catch (error) {
      console.error("token值没有存储", error);
    }
  };
  // 清除token值和id值
  const clearuserInfo = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("id");
      setToken(null);
      setID(null);
    } catch (error) {
      console.error("token值没有清除", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        id,
        token,
        saveTokenToStorage,
        clearuserInfo,
        saveIDToStorage,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
