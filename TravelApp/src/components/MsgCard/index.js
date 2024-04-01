import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, WhiteSpace, WingBlank, Button } from "@ant-design/react-native";
import {
  Cog6ToothIcon,
  ViewfinderCircleIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function MsgCard({ isLoggedIn }) {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      onPress={!isLoggedIn ? () => navigation.navigate("Login") : null}>
      <View>
        <Card style={styles.headerCard}>
          {/* 三个图标,横着平均分布 */}
          <TouchableWithoutFeedback
            onPress={isLoggedIn ? () => navigation.navigate("") : null}>
            <View style={styles.msgIcon}>
              <Image
                source={require("../../../assets/images/travelPlan.png")}
                style={{ width: 50, height: 50 }}
              />
              <Text style={{ marginTop: 5 }}>旅行计划</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View
              style={styles.msgIcon}
              onPress={
                isLoggedIn ? () => navigation.navigate("") : null
              }>
              <Image
                source={require("../../../assets/images/hudongMsg.png")}
                style={{ width: 50, height: 50 }}
              />
              <Text style={{ marginTop: 5 }}>互动消息</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View
              style={styles.msgIcon}
              onPress={
                isLoggedIn ? () => navigation.navigate("") : null
              }>
              <Image
                source={require("../../../assets/images/account.png")}
                style={{ width: 50, height: 50 }}
              />
              <Text style={{ marginTop: 5 }}>系统消息</Text>
            </View>
          </TouchableWithoutFeedback>
        </Card>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    width: "96%",
    marginLeft:10,
    height: 100,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingStart: 30,
    paddingEnd: 30,
    margin:'auto'
  },
  msgIcon: {
    alignItems: "center",
  },
});
