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
      } else {
        Toast.info("用户名重复", 1);
        return false;
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
      Toast.info("请同意服务协议", 1);
      return;
    } else {
      // 执行注册逻辑
      // 默认头像
      const defaultAvatar =
        "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAUDc8RjwyUEZBRlpVUF94yIJ4bm549a+5kcj////////////////////////////////////////////////////bAEMBVVpaeGl464KC6//////////////////////////////////////////////////////////////////////////AABEIAlcCVwMBIgACEQEDEQH/xAAZAAEAAwEBAAAAAAAAAAAAAAAAAgMEAQX/xAAwEAEAAgIBAwMDAwQDAAMBAAAAAQIDEQQSITFBUWETIjIUcZEjQlKBM2KhRFOCsf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAcEQEBAQADAQEBAAAAAAAAAAAAARECEjEhUUH/2gAMAwEAAhEDEQA/ANoAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
      const data = {
        username: usernameValue,
        password: passwordValue,
        nickName: usernameValue,
        article: [],
        Avatar: defaultAvatar,
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
              style={{ color: "#fff" ,}}
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
    color: "#fff",
    marginTop: 350,
  },
  registerBtn: {
    backgroundColor: "rgba(255,255,255,0.5)",
    fontSize: 16,
    borderWidth: 0,
  },
});
