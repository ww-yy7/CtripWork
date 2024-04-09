import { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
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
import { Login as fetchLogin, checkUsername } from "../../apis/user";
import { UserContext } from "../../contexts/UserContext";
export default function Login() {
  const navigation = useNavigation();
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); //设置小眼睛图标的显示状态
  const [checked, setChecked] = useState(false); // 是否同意发布规则

  const { saveTokenToStorage, saveIDToStorage, saveUserInfoToStorage } =
    useContext(UserContext);
  // 切换密码框的显示状态
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // 用户名输入框的校验
  const validateUsername = async () => {
    // 定义一个正则表达式，匹配任何非空白字符
    const pattern = /^\S+$/;
    // 正则匹配手机号
    if (usernameValue.length === 0) {
      // Toast.info("用户名输入不为空", 1);
      return false; // 用户名不符合规则
    }
    // 校验空格
    else if (!pattern.test(usernameValue)) {
      Toast.info("用户名不能包含空格", 1);
      return false; // 用户名不符合规则
    }
    // 校验用户名是否存在
    else {
      let res = await checkUsername(usernameValue);
      // console.log(res.data.code, "code");
      if (res.data.code === 400) {
        // 用户名存在
        return true;
      } else {
        Toast.info("用户名不存在，请注册", 1);
        return false; // 用户名不存在
      }
    }
  };

  // 密码输入框的校验
  const validatePassword = async () => {
    // 密码不为空
    if (passwordValue.length === 0) {
      // Toast.info("密码输入不为空", 1);
      return false; // 密码不符合规则
    } else {
      return true; // 密码正确
    }
  };

  // 登录按钮的点击事件
  const loginBtn = async () => {
    if (!checked) {
      Toast.info("请同意服务协议", 1);
      return;
    }
    // 校验用户名是否符合要求
    const isUsernameValid = validateUsername();
    if (!isUsernameValid) {
      Toast.info("用户名不符合要求", 1);
      return; // 如果用户名不符合要求，不执行后续注册逻辑
    }
    // 校验密码是否符合要求
    const isPasswordValid = validatePassword();
    if (!isPasswordValid) {
      Toast.info("密码不符合要求", 1);
      return; // 如果密码不符合要求，不执行后续注册逻辑
    } else {
      const data = {
        username: usernameValue,
        password: passwordValue,
      };
      // 登录请求，里面加以下事件,获取整个用户信息，并将token存入localStrorage，用async和await
      let res = await fetchLogin(data);
      if (res.data.code === 200) {
        // 将token和—_ID存入localStorage
        await saveTokenToStorage(res.data.token);
        await saveTokenToStorage(res.data.token);
        await saveIDToStorage(res.data.userInfo._id);
        const {
          Avatar,
          nickName,
          sex,
          age,
          email,
          address,
          phone,
          introduction,
        } = res.data.userInfo;
        await saveUserInfoToStorage({
          Avatar,
          nickName,
          sex,
          age,
          email,
          address,
          phone,
          introduction,
        });
        Toast.info("登录成功", 2);
        setTimeout(() => {
          navigation.navigate("Mine");
        }, 1000);
      } else {
        Toast.info("密码错误", 1);
        return;
      }
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
          <KeyboardAvoidingView
          behavior="position"
          >
          <View style={styles.checkBox}>
            <Checkbox
              style={{ color: "#fff" }}
              onChange={() => setChecked(!checked)}
              checked={checked}></Checkbox>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <Text
                style={{
                  color: "#fff",
                  marginLeft: -10,
                  fontSize: 12,
                }}>
                阅读并同意
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("LoginAgreement");
                }}>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    color: "#fff",
                    fontSize: 12,

                  }}>
                  《乐游记平台使用服务协议》
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </KeyboardAvoidingView>
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
    color: "#fff",
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
    color: "#fff",
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
  },
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 350,
  },
});
