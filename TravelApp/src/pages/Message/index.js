import { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  TouchableNativeFeedbackBase,
} from "react-native";
import MyHome from "../../components/MyHome";
import MyTravelList from "../../components/MyTravelList";
import { Card, WhiteSpace, WingBlank, Button } from "@ant-design/react-native";
import {
  Cog6ToothIcon,
  ViewfinderCircleIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import MsgCard from "../../components/MsgCard";
import { UserContext } from "../../contexts/UserContext";
export default function Message() {
  const navigation = useNavigation();
  // 导入context里的全局数据
  const { token } = useContext(UserContext);
  if (!token) {
    return (
      <View style={styles.container}>
        {/* 没有登录的时候显示 */}
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <ImageBackground
            source={require("../../../assets/images/msgbg.jpg")} // 替换成你的背景图片路径
            style={styles.noLoginHeader}>
            <Text style={styles.headermsg}>消息</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={
                !token
                  ? () => {
                      navigation.navigate("Login");
                    }
                  : null
              }>
              <MsgCard token={token} />
            </TouchableOpacity>
          </ImageBackground>

          <View style={{ flex: 1, alignItems: "center" }}>
            {/* 放个图片 */}
            <Image
              source={require("../../../assets/images/travelMsg.png")}
              style={{ width: 200, height: 150, marginTop: 100 }}
            />
            <Text style={{ marginTop: 10, fontSize: 15 }}>登录后查看消息</Text>
            <Button
              type="ghost"
              style={{ height: 40, marginTop: 10 }}
              onPress={() => navigation.navigate("Login")}>
              登录/注册
            </Button>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      //  登录的时候显示
      <View style={styles.container}>
        <View>
          <ImageBackground
            source={require("../../../assets/images/headerbg.png")} // 替换成你的背景图片路径
            style={styles.noLoginHeader}>
            <Text style={styles.headermsg}>消息</Text>
            <MsgCard token={token} />
          </ImageBackground>
          {/* 登录成功的时候的页面，设想是有一个默认的消息页面，有时间的话把另外的页面跳转做一下 */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noLoginHeader: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  headermsg: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
});
