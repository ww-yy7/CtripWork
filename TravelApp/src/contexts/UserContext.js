import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext({});

function UserProvider({ children }) {
  const [token, setToken] = useState("");
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
    } catch (error) {
      // 获取token值失败，进行相应的处理
      // console.error("获取token值失败:", error);
    }
  };
  // 将 token 存储在本地缓存中
  const saveTokenToStorage = async (tokenValue) => {
    try {
      await AsyncStorage.setItem("token", tokenValue);
      // console.log(tokenValue, "token已存储");
      setToken(tokenValue);
    } catch (error) {
      console.error("Error saving token to storage:", error);
    }
  };
  const clearTokenFromStorage = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
    } catch (error) {
      console.error("Error clearing token from storage:", error);
    }
  };
  return (
    <UserContext.Provider
      value={{
        token,
        getToken,
        saveTokenToStorage,
        clearTokenFromStorage,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
