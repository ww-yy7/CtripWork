import { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import MyHome from "../../components/MyHome";
import MyTravelList from "../../components/MyTravelList";
import { Checkbox,Card, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native'
export default function Login() {
    const navigation = useNavigation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 切换密码框的显示状态
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {/* 背景图片，最好是动图 */}
      <Text>账号密码登录</Text>
      <View>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          value={"境内手机号"}
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
            strokeWidth={3}
            color="gray"
            onPress={togglePasswordVisibility}
          />
        ) : (
          <EyeSlashIcon
            size={20}
            strokeWidth={3}
            color="gray"
            onPress={togglePasswordVisibility}
          />
        )}
      </View>
      <Button title="登录"  onPress={() => navigation.navigate("Cart")}></Button>
        <TouchableOpacity  onPress={() => navigation.navigate("Register")} >
        <Text style={styles.linkText}>没有账号？立即注册</Text>
      </TouchableOpacity>
        <Checkbox >阅读并同意携程的《服务协议》和《个人信息保护指南》</Checkbox>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 30,
  },
  password: {
    flexDirection: "row",
    justifyContent: "center",
  },
  passwordInput: {
    flex:1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  linkText:{
    color: "blue",
  }
});
