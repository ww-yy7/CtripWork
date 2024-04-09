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
  Dimensions,
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

// 自定义vw vh函数
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const vw = (percentageWidth) => {
  return (screenWidth * percentageWidth) / 100;
};

const vh = (percentageHeight) => {
  return (screenHeight * percentageHeight) / 100;
};
export default function LikeTravels() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={()=>{navigation.navigate('Other')}}>
        <Image
          source={require("../../../assets/home/home_1.jpg")}
          style={{ width: vw(100), height: vh(23) }}></Image>
        <Image
          source={require("../../../assets/home/home_2.jpg")}
          style={{ width: vw(100), height: vh(23) }}></Image>
        <Image
          source={require("../../../assets/home/home_3.jpg")}
          style={{ width: vw(100), height: vh(23) }}></Image>
        <Image
          source={require("../../../assets/home/home_4.jpg")}
          style={{ width: vw(100), height: vh(23) }}></Image>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
