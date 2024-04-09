import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

export default function HomeSwiper() {
  return (
    <View style={styles.swiper}>
      <Swiper autoplay={true} >
        <Image
          source={require("../../../assets/home/home_1.jpg")}
          style={styles.imagecontainer}
          resizeMode="cover"
        />
        <Image
          source={require("../../../assets/home/home_2.jpg")}
          style={styles.imagecontainer}
          resizeMode="cover"
        />
        <Image
          source={require("../../../assets/home/home_3.jpg")}
          style={styles.imagecontainer}
          resizeMode="cover"
        />
        <Image
          source={require("../../../assets/home/home_4.jpg")}
          style={styles.imagecontainer}
          resizeMode="cover"
        />
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  swiper: {
    backgroundColor: "white",
    paddingHorizontal:6,
    marginVertical: 15,
    flexGrow: 1,
    width: "100%",
    height: 100,
    dot: {
      width: 0,
      height: 0,
      marginHorizontal: 0,
    },
  },
  imagecontainer: {
    backgroundColor: "white",

    flexGrow: 1,
    width: "100%",
    height: 100,
  },
});
