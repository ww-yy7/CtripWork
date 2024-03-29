import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Routes from "./src/Routes";
import CartProvider from "./src/contexts/CartContext";

import { AppLoading } from "expo";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

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

// if (!isReady) {
//   return <AppLoading />;
// }else{
//   return (
//     <NavigationContainer>
//       <CartProvider>
//         <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
//         <Routes />
//       </CartProvider>
//     </NavigationContainer>
//   );
// }

  return (
    <NavigationContainer>
      <CartProvider>
        <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
        <Routes />
      </CartProvider>
    </NavigationContainer>
  );
}
