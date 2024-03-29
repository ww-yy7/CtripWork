import { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import MyHome from "../../components/MyHome";
import MyTravelList from "../../components/MyTravelList";
import {
  Checkbox,
  Card,
  Button,
  WhiteSpace,
  WingBlank,
} from "@ant-design/react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
export default function Login() {
  const navigation = useNavigation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 切换密码框的显示状态
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/loginpagebg.jpg")} // 替换成你的动态图像的路径
      style={styles.background}>
      <View style={styles.container}>
        {/* 背景图片，最好是动图 */}
        <Text style={styles.headerTitle}>账号密码登录</Text>
        <View>
          <TextInput
            style={styles.textinput}
            placeholder="手机号码"
            value={""}
          />
        </View>
        <View style={styles.password}>
          <TextInput
            style={styles.passwordInput}
            value={"登录密码"}
            secureTextEntry={!isPasswordVisible}
          />
          {/* 根据状态变量来显示不同的图标 */}
          {isPasswordVisible ? (
            <EyeIcon
              size={20}
              strokeWidth={2}
              color="#fff"
              onPress={togglePasswordVisibility}
            />
          ) : (
            <EyeSlashIcon
              size={20}
              strokeWidth={2}
              color="#fff"
              onPress={togglePasswordVisibility}
            />
          )}
        </View>

        <Button onPress={() => navigation.navigate("Mine")}>登录</Button>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>没有账号？立即注册</Text>
        </TouchableOpacity>
        <Checkbox>阅读并同意携程的《服务协议》和《个人信息保护指南》</Checkbox>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // 保持图像的宽高比并在视图中尽可能完整显示图像
  },
  container: {
    backgroundColor: "rgba(255,255,255,0)",
    paddingStart: 30,
    paddingEnd: 30,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff", // 修改成白色
    fontWeight: "bold",
    marginBottom: 30,
  },
  textinput: {
    height: 40,
    borderColor: "#fff",
    borderBottomWidth: 1, // 底部边框
  },
  password: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderBottomWidth: 1, // 底部边框
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
  linkText: {
    color: "blue",
  },
});
