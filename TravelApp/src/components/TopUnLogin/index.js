import React from "react";
import { View, ImageBackground,ViewfinderCircleIcon,Cog6ToothIcon, Text, Button, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native';

export default function TopUnLogin(){

  const navigation = useNavigation();

  return(
    <View style={styles.container}>
        {/* 没有登录的时候显示 */}
        <ImageBackground
          source={require("../../../assets/images/headerbg.png")} // 替换成你的背景图片路径
          style={styles.noLoginHeader}>
          <View style={{ paddingTop: 30 }}>
            {/* 放一些小图标 */}
            <View style={styles.headerIcon}>
              <ViewfinderCircleIcon size={25} strokeWidth={1.5} color="white" />
              <Cog6ToothIcon
                size={25}
                strokeWidth={1.5}
                color="white"
                onPress={() => navigation.navigate("Login")}
              />
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
            <View onPress={() => navigation.navigate("Login")}></View>
          </View>
        </ImageBackground>
      </View>
  )
};


const styles = StyleSheet.create({
  headerIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    top:15,
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
    paddingTop: 30,
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
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    borderRadius: 10,
  },
});