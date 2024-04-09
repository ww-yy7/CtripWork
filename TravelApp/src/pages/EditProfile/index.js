import React, { useState } from "react";
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  List,
  Text,
  WhiteSpace,
  Provider,
  DatePicker,
  Toast,
  Button,
} from "@ant-design/react-native";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { updateUserInfo } from "../../apis/user";

export default function EditProfile() {
  const Item = List.Item;
  const {
    id: _id,
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
    incrementChangeAvatarCount,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const [newAvatar, setNewAvatar] = useState(Avatar);
  const [newNickName, setNewNickName] = useState(nickName);
  const [newAge, setNewAge] = useState(age);
  const [newEmail, setNewEmail] = useState(email);
  const [newAddress, setNewAddress] = useState(address);
  const [newPhone, setNewPhone] = useState(phone);
  // 选择性别
  const [newSex, setNewSex] = useState(sex);
  const [selectedImage, setSelectedImage] = useState(sex);
  const handleImagePress = (imageName) => {
    setSelectedImage(imageName === selectedImage ? null : imageName);
    setNewSex(imageName === selectedImage ? null : imageName);
  };

  // 选择图片
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true, // 是否允许编辑
      aspect: [1, 1], // 裁剪比例
      quality: 0.1, // 图片质量
      base64: true, // 是否返回base64
    });

    // console.log(result.assets[0].base64, "pictureResult");
    if (!result.canceled) {
      setNewAvatar(result.assets[0].base64); // 这个是在手机上显示图片 存base64
    }
  };
  // 日期格式化
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  const submitNewProfile = async () => {
    const userInfo = {
      Avatar: newAvatar,
      nickName: newNickName,
      sex: newSex,
      age: newAge,
      email: newEmail,
      address: newAddress,
      phone: newPhone,
      introduction, // 这个就从context里面读取了
    };
    // console.log(newProfile, "newProfile");
    let result = await updateUserInfo({ _id, userInfo });
    console.log(result.data, "result");
    if (result.data.code === 200) {
      await saveUserInfoToStorage(userInfo);
      incrementChangeAvatarCount();
      Toast.info("修改成功");
      navigation.navigate("Mine");
    } else {
      Toast.info("修改失败");
    }
  };

  return (
    <Provider>
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
                source={{ uri: `data:image/jpeg;base64,${newAvatar}` }} // base64
                style={{ width: 29, height: 29, borderRadius: 50 }}
              />
            }>
            头像
          </Item>

          <Item
            arrow="horizontal"
            extra={
              <TextInput
                value={newNickName}
                style={{ width: 290, textAlign: "right" }}
                onChangeText={(text) => {
                  setNewNickName(text);
                }}
              />
            }>
            昵称
          </Item>
          <Item
            arrow="horizontal"
            extra={
              <View>
                <View style={{ flexDirection: "row", borderWidth: 0 }}>
                  <TouchableOpacity onPress={() => handleImagePress("男")}>
                    <Image
                      source={
                        selectedImage === "男"
                          ? require("../../../assets/images/male2.png")
                          : require("../../../assets/images/male1.png")
                      }
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleImagePress("女")}>
                    <Image
                      source={
                        selectedImage === "女"
                          ? require("../../../assets/images/female2.png")
                          : require("../../../assets/images/female1.png")
                      }
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            }>
            性别
          </Item>

          <View>
            <DatePicker
              value={newAge}
              minDate={new Date(1924, 1, 1)}
              maxDate={new Date()}
              onChange={(date) => {
                setNewAge(formatDate(date));
              }}
              format="YYYY-MM-DD"
              style={{ height: 142 }}>
              <List.Item arrow="horizontal">出生日期</List.Item>
            </DatePicker>
          </View>
        </List>
        <WhiteSpace size="lg" />

        <List>
          <Item
            arrow="horizontal"
            extra={
              <TextInput
                value={newEmail}
                style={{ width: 290, textAlign: "right" }}
                onChangeText={(email) => {
                  setNewEmail(email);
                }}
              />
            }>
            邮件
          </Item>
          <Item
            arrow="horizontal"
            extra={
              <TextInput
                value={newPhone}
                style={{ width: 290, textAlign: "right" }}
                onChangeText={(phone) => {
                  setNewPhone(phone);
                }}
              />
            }>
            电话
          </Item>
          <Item
            arrow="horizontal"
            extra={
              <TextInput
                value={newAddress}
                style={{ width: 290, textAlign: "right" }}
                onChangeText={(address) => {
                  setNewAddress(address);
                }}
              />
            }>
            地址
          </Item>
        </List>
        <WhiteSpace size="lg" />

        <List>
          <Item
            arrow="horizontal"
            extra={
              <Text
                style={{
                  width: 250,
                  height: 40,
                  lineHeight: 40,
                  fontSize: 16,
                  textAlign: "right",
                }}
                onPress={() => {
                  navigation.navigate("ModifyProfile", { introduction });
                }}>
                {introduction}
              </Text>
            }>
            自我介绍
          </Item>
        </List>
        <Button onPress={submitNewProfile} style={styles.submitBtn}>
          <Text style={styles.text}>保存</Text>
        </Button>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  submitBtn: {
    flexDirection: "row",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2677e2",
    marginTop: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});
