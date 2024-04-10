import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
} from "react-native";
import MyHome from "../../components/MyHome";
import { Card, Button } from "@ant-design/react-native";
import {
  Cog6ToothIcon,
  ViewfinderCircleIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Register from "../Register";
import { UserContext } from "../../contexts/UserContext";
import MyTravels from "../MyTravels";
import { getAllTravelNote } from "../../apis/user";

export default function Mine() {
  const { id, token, userInfo, setMyTravelsData } = useContext(UserContext);
  const { introduction } = userInfo;
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();

  // 下拉更新
  const onRefresh = () => {
    setRefreshing(true);
    getAllTravelNote({ _id: id }).then((users) => {
      // 使用 flatMap 提取每个用户的所有游记，合并成一个数组
      const allArticles = users.article;
      // console.log(allArticles)
      // 对合并后的游记数组进行排序
      const sortedArticles = allArticles.sort(
        (a, b) => parseInt(b.time) - parseInt(a.time)
      );
      // 更新状态以存储排序后的游记数据
      setMyTravelsData(sortedArticles);
    });
    setTimeout(() => setRefreshing(false), 2000);
  };
  const navigation = useNavigation();
  const [selected, setSelected] = useState("left");

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
  const touchAvatar = () => {
    console.log("点击头像");
    navigation.navigate("EditProfile");
  };

  // 跳转至我的游记
  useEffect(() => {
    // 获取参数
    const showComponentParam = route.params?.showComponent;
    // 如果有指定的参数，则设置状态
    if (showComponentParam) {
      setShowComponent(showComponentParam);
      setSelected("left");
    }
  }, [route.params]);

  if (!token) {
    return (
      // <TopUnlogin></TopUnlogin>
      <View style={styles.container}>
        {/* 没有登录的时候显示 */}
        <ImageBackground
          source={require("../../../assets/images/headerbg.png")} // 替换成你的背景图片路径
          style={styles.noLoginHeader}>
          <View style={{ paddingTop: 30, alignItems: "center" }}>
            <Card style={styles.loginCard}>
              <Image
                source={require("../../../assets/images/logo.png")}
                style={{
                  marginTop: 10,
                  width: 100,
                  height: 100,
                  alignSelf: "center",
                  borderRadius: 50,
                }}
              />
              {/* <View></View> */}
              <Text style={styles.noLoginText}>你的快乐旅游记</Text>
              <View style={styles.changeBtn}>
                <Button
                  type="primary"
                  onPress={() => navigation.navigate("Login")}
                  style={styles.loginLeftBtn}>
                  登录/注册
                </Button>
              </View>
            </Card>
          </View>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* 放一些小图标，不一定要有功能 */}
          <ImageBackground
            source={require("../../../assets/images/minebg.png")}
            style={styles.loginHeader}>
            <View style={styles.headerIcon}>
              <ViewfinderCircleIcon size={25} strokeWidth={1.5} color="#fff" />
              <Cog6ToothIcon
                size={25}
                strokeWidth={1.5}
                color="#fff"
                onPress={() => navigation.navigate("Setting")}
              />
            </View>
            {/* 放置头像信息等模块 */}
            <Card style={styles.headerCard}>
              {/* 头像及用户名等 */}
              <View style={styles.user}>
                {/* 头像 */}
                <TouchableOpacity onPress={touchAvatar}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: `data:image/jpeg;base64,${userInfo.Avatar}`,
                    }} // base64
                  />
                </TouchableOpacity>
                <View>
                  {/* 用户名 */}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, marginLeft: 20 }}>
                      {userInfo.nickName}
                    </Text>
                    <Image
                      source={require("../../../assets/images/vip.png")}
                      style={{ width: 20, height: 20, marginLeft: 10 }}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.intro}
                onPress={() =>
                  navigation.navigate("ModifyProfile", {
                    introduction,
                    isMine: true,
                  })
                }>
                <Text
                  style={{ fontSize: 12, color: "#9f9fa1", marginRight: 4 }}>
                  {userInfo.introduction
                    ? userInfo.introduction
                    : "这个人很懒，什么都没写~~~"}
                </Text>
                <PencilSquareIcon size={16} strokeWidth={1} color="#9f9fa1" />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.cardTextS}>粉丝</Text>
                <Text style={styles.cardTextN}>520</Text>
                <Text style={styles.cardTextS}>关注</Text>
                <Text style={styles.cardTextN}>1</Text>
                <Text style={styles.cardTextS}>获赞</Text>
                <Text style={styles.cardTextN}>999</Text>
                <Text style={styles.cardTextS}>赞过</Text>
                <Text style={styles.cardTextN}>3</Text>
              </View>
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
              {showComponent === "travelList" && <MyTravels />}
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    top: 15,
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
    borderRadius: 10,
    borderWidth: 0,
    // borderColor: "rgba(0,0,0,0)", // 可以设置边框颜色
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  changeBtn: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  loginLeftBtn: {
    height: 40,
    color: "white",
    width: 150,
    backgroundColor: "rgba(10, 53, 139,.7)",
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
    flex: 1,
    paddingStart: 10,
    paddingEnd: 10,
    backgroundPosition: "center", // 图片居中显示
    resizeMode: "cover", // 保持图像的宽高比并在视图中尽可能完整显示图像
  },
  loginHeader: {
    height: 240,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 30,
    backgroundSize: "cover", // 保证图片铺满整个视图
    backgroundPosition: "center", // 图片居中显示
  },
  noLoginText: {
    marginTop: 20,
    color: "rgba(10, 53, 139,.7)",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "rgb(255,255,255)",
    height: 40,
    borderRadius: 10,
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
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    borderRadius: 10,
  },
  loginCard: {
    width: "90%",
    marginTop: 200,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: "rgba(255,255,255,.5)",
  },
  cardTextS: {
    fontSize: 12,
    color: "grey",
    marginLeft: 10,
    marginTop: 5,
  },
  cardTextN: {
    fontSize: 14,
    marginLeft: 5,
    marginTop: 5,
  },
  intro: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
    alignItems: "center",
  },
});
