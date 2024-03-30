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
  Toast,
  Provider,
} from "@ant-design/react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { User } from "react-native-feather";
export default function Register() {
  const navigation = useNavigation();
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);  //设置小眼睛图标的显示状态
  const [checked, setChecked] = useState(false); // 是否同意发布规则
  const [avatar, setAvatar] = useState(''); // 上传的头像
  // 切换密码框的显示状态
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // 提交游记
  const loginBtn = () => {
    if (!usernameValue) {
      Toast.info("用户名不能为空", 1);
    } else if (!passwordValue) {
      Toast.info("密码不能为空", 1);
    } else if (!checked) {
      Toast.info("请同意发布规则", 1);
    } else {
      const data = {
        username: usernameValue,
        password: passwordValue,
      };
      // 登录请求，里面加以下事件
      Toast.info("注册成功", 1);
      navigation.navigate("Mine");
    }
  };

  return (
    <Provider>
    <ImageBackground
      source={require("../../../assets/images/loginpagebg.jpg")} // 替换成你的动态图像的路径
      style={styles.background}>
      <View style={styles.container}>
        {/* 背景图片，最好是动图 */}
        <Text style={styles.headerTitle}>用户注册</Text>
        <View>
          <TextInput
            style={styles.textinput}
            placeholder="用户名"
            onChangeText={(text) => setUsernameValue(text)}
            value={usernameValue}
          />
        </View>
        <WhiteSpace size="lg" />
        <View style={styles.password}>
          <TextInput
            style={styles.passwordInput}
            onChangeText={(text) => setPasswordValue(text)}
            value={passwordValue}
            placeholder="登录密码"
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
        <WhiteSpace size="lg" />
        <Button onPress={loginBtn}>注册</Button>
        <View style={styles.checkBox}>
          <Checkbox style={{ color: "#fff" }}  onChange={() => setChecked(!checked)}
          checked={checked}></Checkbox>
          <Text style={{ color: "#fff", marginLeft: -10 }}>
            阅读并同意携程的《服务协议》和《个人信息保护指南》
          </Text>
        </View>
      </View>
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
    fontSize: 16,
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
    fontSize: 16,
  },
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    marginLeft: 30,
    color: "#fff",
  },
});
