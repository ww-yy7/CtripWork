import React, { useEffect } from "react";
import AddorUpdateTravel from "../../components/AddorUpdateTravel";
import { View,Text } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function AddTravel() {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   console.log("1111111112222222222211111111");
  //   // navigation.navigate("Other");
  // }, []);

  return (
    <AddorUpdateTravel/>
    // <View><Text>1</Text></View>
  );
}
