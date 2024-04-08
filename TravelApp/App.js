import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Routes from "./src/Routes";

import { AppLoading } from "expo";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

import UserProvider from "./src/contexts/UserContext";

export default function App() {
  const [theme, setTheme] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const changeTheme = (theme, currentTheme) => {
    setTheme(theme);
    setCurrentTheme(currentTheme);
  };

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(
        "antoutline",
        // eslint-disable-next-line
        require("@ant-design/icons-react-native/fonts/antoutline.ttf")
      );
      await Font.loadAsync(
        'antfill',
        // eslint-disable-next-line
        require('@ant-design/icons-react-native/fonts/antfill.ttf')
      );
    }
    loadFonts()
    setIsReady(true);
  }, []);



  return (
    <NavigationContainer>
        <UserProvider>
        <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
        <Routes />
        </UserProvider>
    </NavigationContainer>
  );
}
