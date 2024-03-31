import { useState } from "react";
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
export default function Login() {
  const navigation = useNavigation();
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); //设置小眼睛图标的显示状态
  const [checked, setChecked] = useState(false); // 是否同意发布规则

  // 切换密码框的显示状态
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // 用户名输入框的校验
  const validateUsername = () => {
    // 定义一个正则表达式，匹配任何非空白字符
    const pattern = /^\S+$/;
    // 正则匹配手机号
    if (usernameValue.length === 0) {
      Toast.info("用户名输入不为空", 1);
      return false; // 用户名不符合规则
    }
    // 校验空格
    else if (!pattern.test(usernameValue)) {
      Toast.info("用户名不能包含空格", 1);
      return false; // 用户名不符合规则
    }
    // 校验用户名是否存在
    else {
      // 请求后端接口，校验用户名是否存在
      // 如果不存在，提示用户
      // Toast.info("用户名不存在", 1);
      // return false; // 用户名不存在
      // 如果存在
      // return true; // 用户名存在
    }
  };

  // 密码输入框的校验
  const validatePassword = () => {
    // 密码不为空
    if (passwordValue.length === 0) {
      Toast.info("密码输入不为空", 1);
      return false; // 密码不符合规则
    }
    // 请求后端接口，校验密码是否正确
    // 如果不正确，提示用户
    // Toast.info("密码错误", 1);
    // 如果正确
  };
  // 登录按钮的点击事件
  const loginBtn = () => {
    // 校验用户名是否符合要求
    const isUsernameValid = validateUsername();
    if (!isUsernameValid) {
      return; // 如果用户名不符合要求，不执行后续注册逻辑
    }
    // 校验密码是否符合要求
    const isPasswordValid = validatePassword();
    if (!isPasswordValid) {
      return; // 如果密码不符合要求，不执行后续注册逻辑
    }
    if (!checked) {
      Toast.info("请同意发布规则", 1);
      return;
    } else {
      const data = {
        username: usernameValue,
        password: passwordValue,
      };
      // 登录请求，里面加以下事件,获取整个用户信息，并将token存入localStrorage
      Toast.info("登录成功", 1);
      navigation.navigate("Mine");
    }
  };

  return (
    <Provider>
      <ImageBackground
        source={require("../../../assets/images/loginpagebg.jpg")}
        style={styles.background}>
        <View style={styles.container}>
          {/* 返回的小图标 */}
          <View style={{ marginLeft: -10 }}>
            <ChevronLeftIcon
              size={20}
              strokeWidth={2}
              color="#fff"
              onPress={() => navigation.goBack()}
            />
          </View>
          <Text style={styles.headerTitle}>欢迎登录</Text>
          <View>
            <TextInput
              style={styles.textinput}
              placeholder="用户名"
              placeholderTextColor="#b5b5b5"
              onChangeText={(text) => setUsernameValue(text)}
              onBlur={validateUsername}
              value={usernameValue}
            />
          </View>
          <WhiteSpace size="lg" />
          <View style={styles.password}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={(text) => setPasswordValue(text)}
              value={passwordValue}
              onBlur={validatePassword}
              placeholder="登录密码"
              placeholderTextColor="#b5b5b5"
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
          <Button onPress={loginBtn}>登录</Button>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.linkText}>没有账号？立即注册</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.checkBox}>
            <Checkbox
              style={{ color: "#fff" }}
              onChange={() => setChecked(!checked)}
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
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff", // 修改成白色
    fontWeight: "bold",
    marginTop: 100,
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
  linkText: {
    color: "#fff",
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
