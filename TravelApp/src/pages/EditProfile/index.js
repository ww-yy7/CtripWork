import React from "react";
import { Image, ScrollView, View, StyleSheet, Button } from "react-native";
import { List, Text, WhiteSpace } from "@ant-design/react-native";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
  const Item = List.Item;
  const {
    userInfo: {
      Avatar,
      nickName,
      sex,
      age,
      email,
      address,
      phone,
      introduction,
    },
    saveUserInfoToStorage,
  } = useContext(UserContext);
  const [newAvatar, setNewAvatar] = React.useState(Avatar);
  console.log(Avatar, "Avatar");
  // 选择图片
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true, // 是否允许编辑
      aspect: [1, 1], // 裁剪比例
      quality: 0.1, // 图片质量
      base64: true, // 是否返回base64
    });

    console.log(result.assets[0].base64,'pictureResult');
    if (!result.canceled) {
      setNewAvatar(result.assets[0].base64); // 这个是在手机上显示图片 存base64
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f5f5f9" }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <List>
        <Item
          arrow="horizontal"
          onPress={pickImage}
          extra={
            <Image
              // source={{
              //   uri: "https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png",
              // }}
              source={{ uri: `data:image/jpeg;base64,${newAvatar}` }} // base64
              style={{ width: 29, height: 29, borderRadius: 50 }}
            />
          }>
          <Text style={{ fontSize: 20 }}>头像</Text>
        </Item>

        <Item
          arrow="horizontal"
          style={styles.listItem}
          extra={<Text>{nickName}</Text>}
          onPress={() => {}}>
          昵称
        </Item>
        <Item arrow="horizontal" extra={<Text>{sex}</Text>} onPress={() => {}}>
          性别
        </Item>
        <Item arrow="horizontal" extra={<Text>{age}</Text>} onPress={() => {}}>
          年龄
        </Item>
      </List>
      <WhiteSpace size="lg" />

      <List>
        <Item
          arrow="horizontal"
          extra={<Text>{email}</Text>}
          onPress={() => {}}>
          邮件
        </Item>
        <Item
          arrow="horizontal"
          extra={<Text>{phone}</Text>}
          onPress={() => {}}>
          电话
        </Item>
        <Item
          arrow="horizontal"
          extra={<Text>{address}</Text>}
          onPress={() => {}}>
          地址
        </Item>
      </List>
      <WhiteSpace size="lg" />

      <List>
        <Item
          arrow="horizontal"
          extra={<Text>无情者伤人，有情者自伤</Text>}
          onPress={() => {}}>
          自我介绍
        </Item>
      </List>
      <Button title="保存" onPress={() => {}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listItem: {
    // height: 120,
    fontSize: 16,
    // backgroundColor: "red",
    // borderBottomWidth: 0.5,
    // borderBottomColor: "red",
    borderBottomWidth: 0, // 移除底部边框
  },
});
