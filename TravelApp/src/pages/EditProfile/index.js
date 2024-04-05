import React from "react";
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import {
  List,
  Text,
  WhiteSpace,
  Provider,
  DatePicker,
  Radio,
  Toast
} from "@ant-design/react-native";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { updateUserInfo } from "../../apis/user";

export default function EditProfile() {
  const Item = List.Item;
  const {
    id:_id,
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
  const navigation = useNavigation();
  const [newAvatar, setNewAvatar] = React.useState(Avatar);
  const [newNickName, setNewNickName] = React.useState(nickName);
  const [newSex, setNewSex] = React.useState(sex);
  const [newAge, setNewAge] = React.useState(age);
  const [newEmail, setNewEmail] = React.useState(email);
  const [newAddress, setNewAddress] = React.useState(address);
  const [newPhone, setNewPhone] = React.useState(phone);
  const [newIntroduction, setNewIntroduction] = React.useState(introduction);

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

  const submitNewProfile = async() => {
    const userInfo = {
      Avatar: newAvatar,
      nickName: newNickName,
      sex: newSex,
      age: newAge,
      email: newEmail,
      address: newAddress,
      phone: newPhone,
      introduction: newIntroduction,
  }
  // console.log(newProfile, "newProfile");
  // TODO: 提交新的用户信息(1.将新的用户信息提交到后端 2.将新的用户信息保存到本地)
  let result = await updateUserInfo({_id, userInfo});
  console.log(result.data, "result");
  if(result.data.code === 200){
    await saveUserInfoToStorage(userInfo);
    Toast.info("修改成功");
    navigation.navigate("Mine");

  }
  else{
    Toast.info("修改失败");
  }
}
    

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
              source={{ uri: `data:image/jpeg;base64,${newAvatar}`}} // base64
              style={{ width: 29, height: 29, borderRadius: 50 }}
            />
          }>
          <Text style={{ fontSize: 20 }}>头像</Text>
        </Item>

        <Item
          arrow="horizontal"
          style={styles.listItem}
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
            <List style={{ borderColor: "red", borderWidth: 0 }}>
              <Radio.Group
                onChange={(e) => {
                  setNewSex(e.target.value);
                }}
                value={newSex}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingVertical: 6,
                  borderTopWidth: 0,
                  borderColor: "red",
                }}>
                <Radio value={"1"}>男</Radio>
                <Radio value={"0"}>女</Radio>
              </Radio.Group>
            </List>
          }>
          性别
        </Item>
        <Provider>
          <List>
            <DatePicker
              value={newAge}
              minDate={new Date(1900, 1, 1)}
              maxDate={new Date()}
              onChange={(date) => {
                setNewAge(formatDate(date));
              }}
              format="YYYY-MM-DD"
              style={{ height: 120 }}>
              <List.Item arrow="horizontal">出生日期</List.Item>
            </DatePicker>
          </List>
        </Provider>
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
          }
          >
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
          }
          >
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
          }
          >
          地址
        </Item>
      </List>
      <WhiteSpace size="lg" />

      <List>
        <Item
          arrow="horizontal"
          extra={
            <TextInput
              value={newIntroduction}
              style={{ width: 250,height:40,fontSize:16, textAlign: "right"}}
              onChangeText={(introduction) => {
                setNewIntroduction(introduction);
              }}
            />
          }
          >
          自我介绍
        </Item>
      </List>
      <Button title="保存" onPress={submitNewProfile} />
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
