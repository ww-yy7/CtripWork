import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Card } from "@ant-design/react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function MsgCard({ token }) {
  const navigation = useNavigation();
  return (
    <View>
      <Card style={styles.headerCard}>
        {/* 三个图标,横着平均分布 */}
        <TouchableOpacity
          onPress={
            !token
              ? () => navigation.navigate("Login")
              : () => navigation.navigate("Other")
          }>
          <View style={styles.msgIcon}>
            <Image
              source={require("../../../assets/message/travelPlan.png")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{ marginTop: 5 }}>旅行计划</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={!token ? () => navigation.navigate("Login") : null}>
          <View style={styles.msgIcon}>
            <Image
              source={require("../../../assets/message/hudongMsg.png")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{ marginTop: 5 }}>互动消息</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={!token ? () => navigation.navigate("Login") : null}>
          <View style={styles.msgIcon}>
            <Image
              source={require("../../../assets/message/account.png")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{ marginTop: 5 }}>系统消息</Text>
          </View>
        </TouchableOpacity>
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
