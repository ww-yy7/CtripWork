import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  Checkbox,
  Button,
  WhiteSpace,
  Toast,
  Provider,
} from "@ant-design/react-native";
import {
  EyeIcon,
  EyeSlashIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { Register as fetchRegister, checkUsername } from "../../apis/user";
import { UserContext } from "../../contexts/UserContext";


export default function Setting() {
  const navigation = useNavigation();
  const { clearuserInfo } = useContext(UserContext);

   // 退出登录
   const logOut = () => {
    clearuserInfo();
    navigation.navigate("Home");
  };


  return (
    <Provider>
      <ImageBackground
        source={require("../../../assets/images/registerbg.jpg")}
        style={styles.background}>
        <Button onPress={logOut}>退出登录</Button>
      </ImageBackground>
    </Provider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // 保持图像的宽高比并在视图中尽可能完整显示图像
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0)",
    paddingStart: 30,
    paddingEnd: 30,
    paddingTop: 50,
  },
});
