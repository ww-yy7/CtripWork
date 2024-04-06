import React, { useState } from "react";
import { Button, List, TextareaItem } from "@ant-design/react-native";
import { StyleSheet, View,Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";


export default function ModifyProfile({ route,navigation: { goBack }}) {
  const navigation = useNavigation();
  const { introduction: defaultValue } = route.params;
  const [value, setValue] = useState(defaultValue);
  const { saveUserInfoToStorage,userInfo }= useContext(UserContext);

  // 提交修改
  const submit = async () => {
    await saveUserInfoToStorage({...userInfo,introduction:value});
    goBack();
  };

  return (
    <View>
      <List renderHeader={"修改您的自我介绍吧"}>
        <TextareaItem value={value} onChange={(val)=>setValue(val)} rows={4} count={50} style={{height:120}} />
      </List>
        <Button style={styles.btn} onPress={submit} ><Text style={styles.text}>保存</Text></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#2677e2",
    marginTop: 10,
  },
  text:{
    color:'white',
    fontSize:18,
  }
});
