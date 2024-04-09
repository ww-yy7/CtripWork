import { View, Text, StyleSheet, Image } from "react-native";

export default function Other() {
  const images = [
    require("../../../assets/other/working_1.png"),
    require("../../../assets/other/working_2.png"),
    require("../../../assets/other/working_3.png"),
    require("../../../assets/other/working_4.png"),
    require("../../../assets/other/working_5.png"),
    require("../../../assets/other/working_6.png"),
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  return (
    <View style={styles.container}>
      <Image
        source={images[randomIndex]}
        style={{ width: 200, height: 200, marginTop: 100 }}
      />
      <Text style={{ fontSize: 18, marginTop: 10 }}>敬请期待!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f9",
    paddingTop: 10,
    alignItems: "center",
  },
});
