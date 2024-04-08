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

export default function MsgCard({ token }) {
  const navigation = useNavigation();
  return (

    <View >
      <Card style={styles.headerCard}>
        {/* 三个图标,横着平均分布 */}
        <TouchableHighlight
          onPress={token ? () => navigation.navigate("Mine") : null}>
          <View style={styles.msgIcon}>
            <Image
              source={require("../../../assets/message/travelPlan.png")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{ marginTop: 5 }}>旅行计划</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={token ? () => navigation.navigate("") : null}>
          <View style={styles.msgIcon}>
            <Image
              source={require("../../../assets/message/hudongMsg.png")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{ marginTop: 5 }}>互动消息</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={token ? () => navigation.navigate("") : null}>
          <View style={styles.msgIcon}>
            <Image
              source={require("../../../assets/message/account.png")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{ marginTop: 5 }}>系统消息</Text>
          </View>
        </TouchableHighlight>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    width: "96%",
    marginLeft: 10,
    height: 100,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingStart: 30,
    paddingEnd: 30,
    margin: "auto",
  },
  msgIcon: {
    alignItems: "center",
  },
});
