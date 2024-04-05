import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import {
  Card,
  WhiteSpace,
  WingBlank,
  Button,
  List,
} from "@ant-design/react-native";
import {
  Cog6ToothIcon,
  ViewfinderCircleIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function MyHome() {
  const navigation = useNavigation();
  const newPage = () => {
    navigation.navigate("Other");
  };
  return (
    <View style={styles.container}>
      {/* 第一个标签卡片 */}
      <Card style={styles.headerCard}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
            升级到高级会员
          </Text>
          <Text style={{ fontSize: 14 }}>更多功能，记录游记更轻松</Text>
        </View>
        <Button type="primary" style={{ height: 40 }} onPress={newPage}>
          去开通
        </Button>
      </Card>
      <WhiteSpace size="lg" />
      <Card style={styles.headerCard}>
        <TouchableOpacity onPress={newPage}>
          <View style={styles.msgIcon}>
            <Image
              source={require("../../../assets/myHome/1_1.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ marginTop: 5 }}>行程安排</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={newPage}>
          <View style={styles.msgIcon}>
            <Image
              source={require("../../../assets/myHome/1_2.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ marginTop: 5 }}>愿望清单</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Message")}>
          <View style={styles.msgIcon}>
            <Image
              source={require("../../../assets/myHome/1_3.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ marginTop: 5 }}>消息通知</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={newPage}>
          <View style={styles.msgIcon}>
            <Image
              source={require("../../../assets/myHome/1_4.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ marginTop: 5 }}>给个好评</Text>
          </View>
        </TouchableOpacity>
      </Card>
      <WhiteSpace size="lg" />
      {/* 获赞数量等卡片 */}
      <Card style={styles.headerCard}>
        <TouchableOpacity onPress={newPage}>
          <View style={styles.msgIcon}>
            <Text style={styles.count}>9</Text>
            <Text style={{ marginTop: 5 }}>我的收藏</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={newPage}>
          <View style={styles.msgIcon}>
            <Text style={styles.count}>3</Text>
            <Text style={{ marginTop: 5 }}>我的点赞</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View style={styles.msgIcon}>
            <Text style={styles.count}>436</Text>
            <Text style={{ marginTop: 5 }}>浏览历史</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={newPage}>
          <View style={styles.msgIcon}>
            <Text style={styles.count}>17654</Text>
            <Text style={{ marginTop: 5 }}>我的积分</Text>
          </View>
        </TouchableOpacity>
      </Card>
      <WhiteSpace size="lg" />
      {/* 我的工具 */}
      <TouchableOpacity onPress={newPage}>
        <Card
          style={{ flexDirection: "column", borderWidth: 0, borderRadius: 10 }}>
          <Text style={styles.cardTitle}>我的工具</Text>
          <View style={styles.headerCard}>
            <View style={styles.msgIcon}>
              <Image
                source={require("../../../assets/myHome/2_1.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ marginTop: 5 }}>常用信息</Text>
            </View>
            <View style={styles.msgIcon}>
              <Image
                source={require("../../../assets/myHome/2_2.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ marginTop: 5 }}>我的奖品</Text>
            </View>

            <View style={styles.msgIcon}>
              <Image
                source={require("../../../assets/myHome/2_3.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ marginTop: 5 }}>报销凭证</Text>
            </View>

            <View style={styles.msgIcon}>
              <Image
                source={require("../../../assets/myHome/2_4.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ marginTop: 5 }}>旅行足迹</Text>
            </View>
          </View>
          <View style={styles.headerCard}>
            <View style={styles.msgIcon}>
              <Image
                source={require("../../../assets/myHome/2_5.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ marginTop: 5 }}>行程助手</Text>
            </View>

            <View style={styles.msgIcon}>
              <Image
                source={require("../../../assets/myHome/2_6.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ marginTop: 5 }}>我的信用</Text>
            </View>

            <View style={styles.msgIcon}>
              <Image
                source={require("../../../assets/myHome/2_7.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ marginTop: 5 }}>出行清单</Text>
            </View>

            <View style={styles.msgIcon}>
              <Image
                source={require("../../../assets/myHome/2_8.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ marginTop: 5 }}>学生权益</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
      <WhiteSpace size="lg" />
      <TouchableOpacity
        style={styles.imgCard}
        onPress={() => navigation.navigate("AddTravel")}>
        <Image
          source={require("../../../assets/myHome/bg.jpg")}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}></Image>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: -5,
    padding: 8,
  },
  headerCard: {
    width: "100%",
    height: 100,
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingStart: 30,
    paddingEnd: 30,
    borderWidth: 0,
  },
  msgIcon: {
    alignItems: "center",
  },
  item: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    height: 50,
  },
  listCard: {
    width: "100%",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 10,
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  cardTitle: {
    paddingStart: 30,
    paddingTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  count: {
    height: 30,
    fontWeight: "bold",
    fontSize: 18,
  },
  imgCard: {
    height: 200,
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 10,
    borderWidth: 0,
  },
});
