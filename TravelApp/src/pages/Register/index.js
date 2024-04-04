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
import { Register as fetchRegister, checkUsername } from "../../apis/user";

export default function Register() {
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
    } else if (usernameValue.length > 12) {
      Toast.info("用户名不能超过12位", 1);
      return false; // 用户名不符合规则
    }
    // 校验用户名是否重复
    else {
      let res = await checkUsername(usernameValue);
      console.log(res.data.code, "code111");
      if (res.data.code === 200) {
        return true; // 用户名符合规则
      }else{
        Toast.info("用户名重复", 1);
        return false
      }     
    }
  };
  // 设置密码输入框的校验
  const validatePassword = () => {
    // console.log(passwordValue);
    // 定义一个正则表达式，匹配任何非空白字符
    const pattern1 = /^\S+$/;
    // 密码匹配规则要求是字母加数字加字符，不超过16位
    const pattern2 = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![^0-9a-zA-Z]+$).{6,16}$/;
    // 密码不为空
    if (passwordValue.length === 0) {
      // Toast.info("密码输入不为空", 1);
      return false; // 密码不符合规则
    }
    // 正则匹配手机号
    else if (!pattern2.test(passwordValue)) {
      Toast.info("密码格式为字母和数字组合", 1);
      return false; // 密码不符合规则
    }
    // 校验空格
    else if (!pattern1.test(passwordValue)) {
      Toast.info("密码不能包含空格", 1);
      return false; // 密码不符合规则
    } else {
      // Toast.info("密码设置正确", 1);
      return true; // 密码符合规则
    }
  };

  // 注册按钮的点击事件
  const registerBtn = async () => {
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
    // 判断是否同意发布规则
    else if (!checked) {
      Toast.info("请同意发布规则", 1);
      return;
    } else {
      // console.log(111);
      // 执行注册逻辑
      const data = {
        username: usernameValue,
        password: passwordValue,
        nickName: usernameValue,
        article: [],
        Avatar: "../../../assets/images/startAvatar.jpg",
        sex: "",
        age: "",
        email: "",
        address: "",
        phone: "",
        introduction: "",
      };
      let res = await fetchRegister(data);
      console.log(res.data.code, "code注册");
      if (res.data.code === 200) {
        // 注册，里面加以下事件
        Toast.info("注册成功,去登录", 1);
        navigation.navigate("Login");
      } else {
        Toast.info("注册失败", 1);
      }
    }
  };

  return (
    <Provider>
      <ImageBackground
        source={require("../../../assets/images/registerbg.jpg")}
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
          <Text style={styles.headerTitle}>欢迎注册</Text>
          <View>
            <TextInput
              style={styles.textinput}
              placeholder="设置用户名，不超过12位"
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
              placeholder="设置密码，6-16位字母和数字组合"
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
          <Button style={styles.registerBtn} onPress={registerBtn}>
            注册
          </Button>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.linkText}>已有账号，去登录</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.checkBox}>
            <Checkbox
              style={{ color: "#fff" }}
              onChange={() => setChecked(!checked)}
              checked={checked}></Checkbox>
            <Text style={{ color: "#fff", marginLeft: -10 }}>
              阅读并同意携程的《用户隐私协议》和《用户注册协议》
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
    marginLeft: 0,
    color: "#fff",
    marginTop: 380,
  },
  registerBtn: {
    backgroundColor: "rgba(255,255,255,0.5)",
    fontSize: 16,
    borderWidth: 0,
  },
});
