import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, createContext } from "react";
import { getAllTravelNote } from "../apis/user";

export const UserContext = createContext({});

function UserProvider({ children }) {
  const [token, setToken] = useState("");
  const [id, setID] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [publish, setPublish] = useState(0); // 点击发布时，按钮变更，为了发布后页面更新
  const [deleteCount, setDeleteCount] = useState(0)
  const [changeAvatar, setChangeAvatar] = useState(0);
  const [travelsData, setTravelsData] = useState([]); //全部游记数据
  const [mytravelsData, setMyTravelsData] = useState([]);  //我的游记数据
  
  

  // 函数用于增加发布次数
  const incrementPublishCount = () => {
    setPublish(prevCount => prevCount + 1);
  };
  // 函数用于增加删除次数
  const incrementDeleteCount = () => {
    setDeleteCount(prevCount => prevCount + 1);
  }
  // 用于增加改变头像次数
  const incrementChangeAvatarCount = () => {
    setChangeAvatar(prevCount => prevCount + 1);
  };

  // 将 id 存储在本地缓存中
  const saveIDToStorage = async (idValue) => {
    try {
      await AsyncStorage.setItem("id", idValue);
      setID(idValue);
    } catch (error) {
      console.error("id值没有存储", error);
    }
  };
  // 存储用户信息
  const saveUserInfoToStorage = async (userInfoValue) => {
    try {
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfoValue));
      setUserInfo(userInfoValue);
    } catch (error) {
      console.error("userInfo值没有存储", error);
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
        id, // 用户ID
        token,
        userInfo,
        publish, // 也可以提供当前发布次数的状态
        deleteCount,
        travelsData,
        changeAvatar,
        mytravelsData,
        saveUserInfoToStorage,
        saveTokenToStorage,
        clearuserInfo,
        saveIDToStorage,
        incrementPublishCount, // 通过context提供这个函数
        incrementDeleteCount,
        incrementChangeAvatarCount,
        setMyTravelsData,
        setTravelsData
      }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
