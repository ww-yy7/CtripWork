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


import Travels from "../../components/Travels";

export default function LikeTravels() {


  const user = {
    userName: "ww",
  };
  const navigation = useNavigation();
  const token = true;
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
  // console.log(isLoggedIn)

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
        <View>
          <ImageBackground
            source={require("../../../assets/images/headerbg.png")} // 替换成你的背景图片路径
            style={styles.noLoginHeader}>
            {/* 放一些小图标 */}
            <View style={styles.headerIcon}>
              <ViewfinderCircleIcon size={25} strokeWidth={1.5} color="white" />
              <Cog6ToothIcon size={25} strokeWidth={1.5} color="white" />
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
          </ImageBackground>
          {/* 静态展示的页面，点击都会到登录页面 */}
          <View></View>
        </View>
      )}

      {/* 登录的时候显示 */}
      {isLoggedIn && (
        <ScrollView >
        <View>
          <Travels></Travels>
        </View>
        </ScrollView>
      )}
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
    height: 200,
    padding: 10,
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




