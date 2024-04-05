import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import {
  Checkbox,
  Button,
  WhiteSpace,
  Toast,
  Provider,
  List,
  Brief,
} from "@ant-design/react-native";
import {
  EyeIcon,
  EyeSlashIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { Register as fetchRegister, checkUsername } from "../../apis/user";
import { UserContext } from "../../contexts/UserContext";

export default function Other() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/working.png")}
        style={{ width:200, height: 200, marginTop: 100 }}
      />
      <Text style={{fontSize:18,marginTop:10}}>敬请期待!</Text>
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
