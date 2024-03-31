import { useContext, useState, useEffect } from "react";
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

export default function Mine() {
  const user = {
    userName: "ww",
  };
  const navigation = useNavigation();
  const token = false;
  const [selected, setSelected] = useState("left");
  // 判断是否登录
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // 当 token 发生变化时，更新登录状态
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  // 控制组件显示
  const [showComponent, setShowComponent] = useState("travelList");
  const handleShowHome = () => {
    setShowComponent("travelList");
    setSelected("left");
  };
  const handleShowTravelList = () => {
    setShowComponent("home");
    setSelected("right");
  };

  return (
    <View style={styles.container}>
      {/* 没有登录的时候显示 */}
      {!isLoggedIn && (
        <ImageBackground
          source={require("../../../assets/images/headerbg.png")} // 替换成你的背景图片路径
          style={styles.noLoginHeader}>
          <View style={{ paddingTop: 30 }}>
            {/* 放一些小图标 */}
            <View style={styles.headerIcon}>
              <ViewfinderCircleIcon size={25} strokeWidth={1.5} color="white" />
              <Cog6ToothIcon size={25} strokeWidth={1.5} color="white"  onPress={() => navigation.navigate("Login")} />
            </View>
            <Text style={styles.noLoginText}>登录携程，开启旅程</Text>
            <View style={styles.changeBtn}>
              <Button
                type="primary"
                onPress={() => navigation.navigate("Login")}
                style={styles.loginLeftBtn}>
                登录/注册
              </Button>
              <Button
                type="primary"
                onPress={() => navigation.navigate("")}
                style={styles.loginRightBtn}>
                手机号查单
              </Button>
            </View>

            {/* 静态展示的页面，点击都会到登录页面 */}
            <View  onPress={() => navigation.navigate("Login")}></View>
          </View>
        </ImageBackground>
      )}

      {/* 登录的时候显示 */}
      {isLoggedIn && (
        <View >
          <ScrollView>
            {/* 放一些小图标，不一定要有功能 */}
            <ImageBackground
              source={require("../../../assets/images/minebg.png")}
              style={styles.loginHeader}>
              <View style={styles.headerIcon}>
                <ViewfinderCircleIcon
                  size={25}
                  strokeWidth={1.5}
                  color="#fff"
                  
                />
                <Cog6ToothIcon size={25} strokeWidth={1.5} color="#fff" />
              </View>
              {/* 放置头像信息等模块 */}
              <Card style={styles.headerCard}>
                {/* 头像及用户名等 */}
                <View style={styles.user}>
                  {/* 头像 */}
                  <Image
                    style={styles.avatar}
                    source={require("../../../assets/images/startAvatar.png")}
                  />
                  <View>
                    {/* 用户名 */}
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ fontSize: 20, marginLeft: 20 }}>
                        {user.userName}
                      </Text>
                      <Image
                        source={require("../../../assets/images/vip.png")}
                        style={{ width: 20, height: 20, marginLeft: 10 }}
                      />
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginTop: 10,
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("")}>
                  <Text
                    style={{ fontSize: 12, color: "#9f9fa1", marginRight: 4 }}>
                    简单的自我介绍，让你更受欢迎
                  </Text>
                  <PencilSquareIcon size={16} strokeWidth={1} color="#9f9fa1" />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 12,
                    color: "grey",
                    marginLeft: 10,
                    marginTop: 5,
                  }}>
                  粉丝 2 关注 0 获赞 0 赞过 0
                </Text>
              </Card>
            </ImageBackground>
            {/* 放个人游记列表处 */}
            <Card style={styles.listCard}>
              <View style={styles.selectContainer}>
                <TouchableOpacity
                  style={styles.selectTouch}
                  onPress={handleShowHome}>
                  <Text
                    style={[
                      styles.noSelectedText,
                      selected === "left" && styles.selectedText,
                    ]}>
                    我的游记
                  </Text>
                  {selected === "left" && (
                    <Image
                      style={styles.heng}
                      source={require("../../../assets/images/heng.png")}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selectTouch}
                  onPress={handleShowTravelList}>
                  <Text
                    style={[
                      styles.noSelectedText,
                      selected === "right" && styles.selectedText,
                    ]}>
                    个人主页
                  </Text>
                  {selected === "right" && (
                    <Image
                      style={styles.heng}
                      source={require("../../../assets/images/heng.png")}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View>
                {/* 根据状态变量显示对应的组件 */}
                {showComponent === "home" && <MyHome />}
                {showComponent === "travelList" && <MyTravelList />}
              </View>
            </Card>
          </ScrollView>
        </View>
      )}
      {/* <BottomTabs/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerCard: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0)", // 可以设置边框颜色
  },
  user: {
    flexDirection: "row",
    height: 60,
  },
  avatar: {
    marginTop: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  listCard: {
    height: 1000,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0)", // 可以设置边框颜色
  },
  changeBtn: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginLeftBtn: {
    height: 40,
    color: "white",
    width: 150,
    backgroundColor: "#fe7e01",
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0)", // 可以设置边框颜色
  },
  loginRightBtn: {
    height: 40,
    color: "#000", // 按钮文字颜色
    width: 150,
    backgroundColor: "rgba(0,0,0,0)", // 透明背景色
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgb(255,255,255)", // 可以设置边框颜色
  },
  noLoginHeader: {
    height: 240,
    paddingStart: 10,
    paddingEnd: 10,
    backgroundSize: "cover", // 保证图片铺满整个视图
    backgroundPosition: "center", // 图片居中显示
  },
  loginHeader: {
    height: 240,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop:30,
    backgroundSize: "cover", // 保证图片铺满整个视图
    backgroundPosition: "center", // 图片居中显示
  },
  noLoginText: {
    marginTop: 20,
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },  
  selectTouch: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 25,
    marginLeft: 25,
  },
  noSelectedText: {
    fontSize: 14,
    color: "gray",
  },
  selectedText: {
    fontSize: 16,
    color: "black",
  },
  heng: {
    width: 30,
    height: 10,
  },
});
