import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
    ScrollView,
} from "react-native";
import {
  Checkbox,
  Button,
  WhiteSpace,
  Toast,
  Provider,
  List,
  Brief,
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
  const Item = List.Item;
  // 退出登录
  const logOut = () => {
    clearuserInfo();
    navigation.navigate("Mine");
  };

  return (
    <ScrollView style={styles.container}>
     
      <View  style={{borderBottomWidth:0}}>
        <Item style={styles.item} arrow="horizontal" onPress={() =>navigation.navigate('EditProfile')}>
          个人信息
        </Item>
        <Item style={styles.item} arrow="horizontal" onPress={() => {}}>
          账号安全
        </Item>
        <Item style={styles.item} arrow="horizontal" onPress={() => {}}>
          标题文字
        </Item>
        </View>
        <WhiteSpace size="lg" />
        <List>
        <Item style={styles.item} arrow="horizontal" onPress={() => {}}>
          个人主页换肤
        </Item>
        <Item style={styles.item} arrow="horizontal" onPress={() => {}}>
          消息通知
        </Item>
        <Item style={styles.item} arrow="horizontal" onPress={() => {}}>
          零流量升级
        </Item>
        <Item style={styles.item} arrow="horizontal" onPress={() => {}}>
         使用移动网络改善内容浏览体验
        </Item>
      </List>
      <WhiteSpace size="lg" />
        <List>
        <Item style={styles.item} arrow="horizontal" onPress={() => {}}>
          隐私设置
        </Item>
        <Item style={styles.item} arrow="horizontal" onPress={() => {}}>
          通用设置
        </Item>
        <Item style={styles.item} arrow="horizontal" onPress={() => {}}>
          清理缓存
        </Item>
      </List>
      <WhiteSpace size="lg" />
        <List>
        <Item style={styles.item} arrow="horizontal" onPress={() => {}}>
          意见反馈
        </Item>
        <Item style={styles.item} arrow="horizontal" onPress={() => {}}>
          关于乐游记
        </Item>
      </List>
      <Button  style={styles.outBtn} type='primary' onPress={logOut}>退出登录</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f9",
    paddingTop: 10,
  },
  outBtn: {
    marginTop: 50,
    marginHorizontal: 30,
  },
  item:{
    backgroundColor: "#fff",
    borderBottomWidth: 0
  }
});
