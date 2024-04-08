import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  WhiteSpace,
  Button,
  List,
} from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import MsgCard from "../../components/MsgCard";
import { UserContext } from "../../contexts/UserContext";
export default function Message() {
  const navigation = useNavigation();
  // 导入context里的全局数据
  const { token } = useContext(UserContext);
  const Item = List.Item;
  const Brief = Item.Brief;
  if (!token) {
    return (
      <View style={styles.container}>
        {/* 没有登录的时候显示 */}
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <ImageBackground
            source={require("../../../assets/message/msgbg.jpg")} // 替换成你的背景图片路径
            style={styles.noLoginHeader}>
            <Text style={styles.headermsg1}>消息</Text>
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
              source={require("../../../assets/message/travelMsg.png")}
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
            source={require("../../../assets/message/headerbg.jpg")} // 替换成你的背景图片路径
            style={styles.noLoginHeader}>
            <Text style={styles.headermsg}>消息</Text>
            <MsgCard token={token} />
          </ImageBackground>
          {/* 登录成功的时候的页面，设想是有一个默认的消息页面，有时间的话把另外的页面跳转做一下 */}
          <ScrollView
            // style={{backgroundColor:"#fff"}}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View>
              <Item
                style={{ paddingTop: 5 }}
                thumb={
                  <Image
                    source={require("../../../assets/message/avatar_7.png")}
                    style={{ width: 40, height: 40, marginRight: 10 }}
                  />
                }
                multipleLine>
                系统消息
                <Brief style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}>
                  您已成功注册账号，快来体验吧！
                </Brief>
              </Item>
              <Item
                style={{ paddingTop: 5 }}
                thumb={
                  <Image
                    source={require("../../../assets/message/avatar_6.png")}
                    style={{ width: 40, height: 40, marginRight: 10 }}
                  />
                }
                multipleLine>
                机器人YouG
                <Brief style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}>春日美好，出门踏青</Brief>
              </Item>
              <WhiteSpace size="lg" />
              <Item
                style={{ paddingTop: 5 }}
                thumb={
                  <Image
                    source={require("../../../assets/message/avatar_8.png")}
                    style={{ width: 40, height: 40, marginRight: 10,borderRadius:20 }}
                  />
                }
                multipleLine>
                携程旅行
                <Brief style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}>金牌推荐，旅行三折起，心动不如行动......</Brief>
              </Item>
              <Item
                style={{ paddingTop: 5 }}
                thumb={
                  <Image
                    source={require("../../../assets/message/avatar_2.png")}
                    style={{ width: 40, height: 40, marginRight: 10 }}
                  />
                }
                multipleLine>
                小美
                <Brief style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}>我今天去的无锡鼋头渚，樱花可好看啦！</Brief>
              </Item>
              <Item
                style={{ paddingTop: 5 }}
                thumb={
                  <Image
                    source={require("../../../assets/message/avatar_5.png")}
                    style={{ width: 40, height: 40, marginRight: 10,borderRadius:20 }}
                  />
                }
                multipleLine>
                推荐官小智
                <Brief style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}>华东理工大学的春日美好，点击就看！</Brief>
              </Item>
              <Item
                style={{ paddingTop: 5 }}
                thumb={
                  <Image
                    source={require("../../../assets/message/avatar_3.png")}
                    style={{ width: 40, height: 40, marginRight: 10 }}
                  />
                }
                multipleLine>
                万万
                <Brief style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}>想要去迪士尼吗？戳我看攻略！</Brief>
              </Item>
              <Item
                style={{ paddingTop: 5 }}
                thumb={
                  <Image
                    source={require("../../../assets/message/avatar_4.png")}
                    style={{ width: 40, height: 40, marginRight: 10 }}
                  />
                }
                multipleLine>
                热心市民应先生
                <Brief style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}>热辣滚烫的早市，你去过了吗？</Brief>
              </Item>
              <Item
                style={{ paddingTop: 5 }}
                thumb={
                  <Image
                    source={require("../../../assets/message/avatar_1.png")}
                    style={{ width: 40, height: 40, marginRight: 10 }}
                  />
                }
                multipleLine>
                小梦
                <Brief style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}>来一场说走就走的旅行吧，去追梦!</Brief>
              </Item>
            </View>
          </ScrollView>
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
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  headermsg1: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
});
