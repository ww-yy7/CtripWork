import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import {
  List,
  TextareaItem,
  Tag,
  Provider,
  Button,
  Modal,
  Toast,
  Checkbox,
} from "@ant-design/react-native";
import {
  MapPinIcon,
  BellIcon,
  CameraIcon,
  XMarkIcon,
  ClockIcon,
  CurrencyYenIcon,
} from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";
import { Login, Register } from "../../apis/user";
import axios from "axios";
import request from "../../utils/request";

export default function AddTravel() {
  const [titleValue, setTitleValue] = useState("");
  const [profileValue, setProfileValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const [tags, setTags] = useState([]); // 存放标签
  const [tagVisible, setTagVisible] = useState(false); // 标签弹出框是否显示
  const [tagValue, setTagValue] = useState(""); // 标签输入框的值

  const [locationVisible, setLocationVisible] = useState(false); // 地点弹出框是否显示
  const [locationValue, setLocationValue] = useState(""); // 地点显示的值
  const [locationInputValue, setLocationInputValue] = useState(""); // 地点输入框的值

  const [playTime, setPlayTime] = useState(""); // 游玩时间
  const [playTimeVisible, setPlayTimeVisible] = useState(false); // 游玩时间弹出框是否显示
  const [playTimeInputValue, setPlayTimeInputValue] = useState(""); // 游玩时间输入框的值

  const [money, setMoney] = useState(""); // 花费
  const [moneyVisible, setMoneyVisible] = useState(false); // 花费弹出框是否显示
  const [moneyInputValue, setMoneyInputValue] = useState(""); // 花费输入框的值

  const [checked, setChecked] = useState(false); // 是否同意发布规则
  const [imageList, setImageList] = useState([]); // 上传的图片

  // 选择图片
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true, // 是否允许编辑
      aspect: [4, 3], // 裁剪比例
      quality: 1, // 图片质量
    });

    console.log(result);

    if (!result.canceled) {
      setImageList([...imageList, result.assets[0].uri]);
    }
  };
  // 删除图片
  const deleteOnePicture = (index) => {
    let list = imageList;
    list.splice(index, 1);
    setImageList([...list]);
  };
  // 提交游记
  const submitTravelNote = () => {
    if (!titleValue) {
      Toast.info("标题不能为空", 1);
    } else if (!contentValue) {
      Toast.info("内容不能为空", 1);
    } else if (!checked) {
      Toast.info("请同意发布规则", 1);
    } else {
      const testId = "6603d54e0ea1e645565627e8"; //临时id
      const data = {
        title: titleValue,
        profile: profileValue,
        content: contentValue,
        tags: tags,
        location: locationValue,
        picture: imageList,
        position: locationValue,
        playTime: playTime,
        money: money,
      };
      Toast.info(data.title, 1);
    }

    // console.log("开始请求2");
    // const sendGetRequest = async () => {
    //   try {
    //     // 发送 GET 请求
    //     const response = await request.get("/users/login"); // 替换为您要测试的具体路径
    //     // 输出响应数据
    //     console.log("Response:", response.data);
    //   } catch (error) {
    //     // 如果请求失败，输出错误信息
    //     console.error("Error:", error);
    //   }
    // };
    // // 调用函数发送请求
    // sendGetRequest();

    try {
      const fetchLogin = async () => {
        console.log(111);
        const testData = {
          username: "fengfeng",
          password: "123456",
        };
        const res = await Login(testData);
        // console.log(res);
      };
      fetchLogin();
    } catch (error) {
      console.log(error);
    }

    // axios
    //   .get("http://10.100.196.230:3000/api/users/login?username=wanwan&password=123456")
    //   .then((response) => {
    //     const result = response.data;
    //     if (result.code === 200) {
    //       // 注册成功
    //       console.log(result.message);
    //       // 可以在此处处理注册成功后的逻辑，如跳转页面、提示用户等
    //     } else {
    //       // 注册失败
    //       console.error(result.message);
    //       // 显示错误消息给用户
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("注册请求失败：", error);
    //     // 处理请求失败的情况
    //   });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tips}>
        <BellIcon
          size={16}
          strokeWidth={3}
          color="gray"
          style={{ marginLeft: 10 }}
        />
        <Text style={{ color: "grey" }}>
          发文方向tips:旅行、探店、风景、美食...
        </Text>
      </View>

      <View style={[styles.innerBox, { height: 500 }]}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {imageList.length > 0 &&
            imageList.map((item, index) => (
              <View>
                <Image
                  key={item}
                  source={{ uri: item }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 5,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                />
                <XMarkIcon
                  onPress={() => deleteOnePicture(index)}
                  style={styles.XMarkIcon}
                  size={16}
                  strokeWidth={3}
                  color="white"
                />
              </View>
            ))}
          {imageList.length < 9 && (
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.imgBox}>
                <CameraIcon size={40} strokeWidth={1} color="gray" />
                <Text>上传图片/视频</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <TextInput
          style={styles.titleInput}
          onChangeText={(text) => setTitleValue(text)}
          value={titleValue}
          placeholder="填写标题更容易上精选哦"
        />
        <TextInput
          style={styles.profileInput}
          onChangeText={(text) => setProfileValue(text)}
          value={profileValue}
          placeholder="填写文章简介"
        />

        <ScrollView
          style={{ flex: 1 }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <List>
            <TextareaItem
              style={{ borderTopWidth: 0.5 ,borderColor:'lightgray'}} // 添加这行样式设置 // 添加这行样式设置，去掉下划线
              rows={10}
              placeholder="详细分享你的真实体验、实用攻略和一些小Tips并带上明确的推荐理由，更容易被推荐哦!"
              count={500}
              value={contentValue}
              onChange={(text) => setContentValue(text)}
            />
          </List>
        </ScrollView>

        <View style={styles.Alltags}>
          {tags.map((tag, index) => (
            <Tag key={index} style={styles.tags} closable>
              {tag}
            </Tag>
          ))}
          <Pressable style={styles.btn} onPress={() => setTagVisible(true)}>
            <Text style={styles.btn_p}>选择标签</Text>
          </Pressable>
        </View>
      </View>
      {/* 添加标签的弹出框 */}
      <Provider>
        <Modal
          popup
          visible={tagVisible}
          animationType="slide-up"
          onClose={() => setVisible(false)}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.tagInput}
              onChangeText={(text) => setTagValue(text)}
              value={tagValue}
              placeholder="填写标签"
            />
            <Button
              style={styles.modalBtn}
              type="primary"
              onPress={() => {
                if (tagValue) {
                  setTags([...tags, tagValue]);
                  setTagValue("");
                  setTagVisible(false);
                } else {
                  Toast.info("标签不能为空", 1);
                }
              }}>
              添加
            </Button>
          </View>

          <Button
            type="primary"
            onPress={() => setTagVisible(false)}
            style={{ backgroundColor: "lightgray", borderColor: "lightgray" }}>
            关闭
          </Button>
        </Modal>
      </Provider>
      {/* 添加地点的弹出框 */}
      <Provider>
        <Modal
          popup
          visible={locationVisible}
          animationType="slide-up"
          onClose={() => setLocationVisible(false)}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.tagInput}
              onChangeText={(text) => setLocationInputValue(text)}
              value={locationInputValue}
              placeholder="填写地点"
            />
            <Button
              style={[
                styles.modalBtn,
                {
                  backgroundColor: locationInputValue
                    ? "rgb(29,177,213)"
                    : "lightgray",
                  borderColor: locationInputValue
                    ? "rgb(29,177,213)"
                    : "lightgray",
                },
              ]}
              type="primary"
              onPress={() => {
                if (locationInputValue) {
                  setLocationValue(locationInputValue);
                  setLocationInputValue("");
                  setLocationVisible(false);
                } else {
                  Toast.info("地点不能为空", 1);
                }
              }}>
              添加
            </Button>
          </View>

          <Button
            type="primary"
            onPress={() => setLocationVisible(false)}
            style={{
              backgroundColor: "rgb(29,177,213)",
              borderColor: "rgb(29,177,213)",
            }}>
            关闭
          </Button>
        </Modal>
      </Provider>
      {/* 添加游玩时间的弹出框 */}
      <Provider>
        <Modal
          popup
          visible={playTimeVisible}
          animationType="slide-up"
          onClose={() => setPlayTimeVisible(false)}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.tagInput}
              onChangeText={(text) => setPlayTimeInputValue(text)}
              value={playTimeInputValue}
              placeholder="填写游玩时间"
            />
            <Button
              style={[
                styles.modalBtn,
                {
                  backgroundColor: playTimeInputValue
                    ? "rgb(29,177,213)"
                    : "lightgray",
                  borderColor: playTimeInputValue
                    ? "rgb(29,177,213)"
                    : "lightgray",
                },
              ]}
              type="primary"
              onPress={() => {
                if (playTimeInputValue) {
                  setPlayTime(playTimeInputValue);
                  setPlayTimeInputValue("");
                  setPlayTimeVisible(false);
                } else {
                  Toast.info("游玩时间不能为空", 1);
                }
              }}>
              添加
            </Button>
          </View>

          <Button
            type="primary"
            onPress={() => setPlayTimeVisible(false)}
            style={{
              backgroundColor: "rgb(29,177,213)",
              borderColor: "rgb(29,177,213)",
            }}>
            关闭
          </Button>
        </Modal>
      </Provider>
      {/* 添加花费的弹出框 */}
      <Provider>
        <Modal
          popup
          visible={moneyVisible}
          animationType="slide-up"
          onClose={() => setMoneyVisible(false)}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.tagInput}
              onChangeText={(text) => setMoneyInputValue(text)}
              value={moneyInputValue}
              placeholder="填写花费"
            />
            <Button
              style={[
                styles.modalBtn,
                {
                  backgroundColor: moneyInputValue
                    ? "rgb(29,177,213)"
                    : "lightgray",
                  borderColor: moneyInputValue
                    ? "rgb(29,177,213)"
                    : "lightgray",
                },
              ]}
              type="primary"
              onPress={() => {
                if (moneyInputValue) {
                  setMoney(moneyInputValue);
                  setMoneyInputValue("");
                  setMoneyVisible(false);
                } else {
                  Toast.info("花费不能为空", 1);
                }
              }}>
              添加
            </Button>
          </View>

          <Button
            type="primary"
            onPress={() => setMoneyVisible(false)}
            style={{
              backgroundColor: "rgb(29,177,213)",
              borderColor: "rgb(29,177,213)",
            }}>
            关闭
          </Button>
        </Modal>
      </Provider>

      <View style={[styles.innerBox, { height: 150 }]}>
        {/* 地点 */}
        {locationValue ? (
          <View style={[{ flexDirection: "row" }, styles.addLocation]}>
            <MapPinIcon
              style={styles.locationIcon}
              size={16}
              strokeWidth={3}
              color="gray"
            />
            <Text
              style={styles.location}
              onPress={() => setLocationVisible(true)}>
              {locationValue}
            </Text>
          </View>
        ) : (
          <View style={styles.addLocation}>
            <MapPinIcon
              style={styles.locationIcon}
              size={18}
              strokeWidth={3}
              color="gray"
            />
            <Text
              style={styles.location}
              onPress={() => setLocationVisible(true)}>
              添加地点
            </Text>
          </View>
        )}
        {/* 游玩时间 */}
        {playTime ? (
          <View style={[{ flexDirection: "row" }, styles.addLocation]}>
            <ClockIcon
              style={styles.locationIcon}
              size={16}
              strokeWidth={3}
              color="gray"
            />
            <Text
              style={styles.location}
              onPress={() => setPlayTimeVisible(true)}>
              {playTime}
            </Text>
          </View>
        ) : (
          <View style={styles.addLocation}>
            <ClockIcon
              style={styles.locationIcon}
              size={18}
              strokeWidth={3}
              color="gray"
            />
            <Text
              style={styles.location}
              onPress={() => setPlayTimeVisible(true)}>
              游玩时间
            </Text>
          </View>
        )}
        {/* 花费 */}
        {money ? (
          <View style={[{ flexDirection: "row" }, styles.addLocation]}>
            <CurrencyYenIcon
              style={styles.locationIcon}
              size={18}
              strokeWidth={3}
              color="gray"
            />
            <Text style={styles.location} onPress={() => setMoneyVisible(true)}>
              {money}
            </Text>
          </View>
        ) : (
          <View style={styles.addLocation}>
            <CurrencyYenIcon
              style={styles.locationIcon}
              size={18}
              strokeWidth={3}
              color="gray"
            />
            <Text style={styles.location} onPress={() => setMoneyVisible(true)}>
              游玩花费
            </Text>
          </View>
        )}

        <Checkbox
          style={{ marginLeft: 5, marginTop: 5 }}
          onChange={() => setChecked(!checked)}
          checked={checked}>
          同意《携程社区发布规则》
        </Checkbox>
      </View>
      <View style={[styles.innerBox, { height: 40 }]}>
        <Button onPress={submitTravelNote} style={styles.submit} type="primary">
          发布
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(255,255,255)",
  },
  innerBox: {
    borderWidth: 0, // 测试时设为1 后面把它改成 0
    borderColor: "gray",
    width: "95%",
    marginBottom: 10,
  },
  tips: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(238,247,254)",
    width: "100%",
    borderRadius: 5,
    marginBottom: 5,
  },
  imgBox: {
    height: 100,
    width: 100,
    backgroundColor: "rgb(247,248,250)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  titleInput: {
    height: 45,
    fontSize: 20,
    borderColor: "lightgray",
    // borderWidth: 1,
    // borderRadius: 5,
    borderBottomWidth: 0.5,
    marginBottom: 10,
    marginLeft: 10,
  },
  profileInput: {
    height: 40,
    fontSize: 16,
    borderColor: "lightgray",
    // borderWidth: 1,
    // borderRadius: 5,
    // borderBottomWidth: 1,
    marginBottom: 10,
    marginLeft: 10,
  },
  Alltags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    marginBottom: 5,
  },
  tags: {
    marginLeft: 5,
    // borderRadius: 50, // 没起效果
  },
  btn: {
    backgroundColor: "rgb(255,255,255)",
    // color:'lightgray',
    width: 80,
    height: 25,
    borderWidth: 1,
    borderColor: "rgb(233,233,233)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  btn_p: {
    color: "rgb(133,133,133)",
    fontSize: 12,
    // borderRadius: 20,
  },
  tagInput: {
    height: 40,
    width: "80%",
    borderColor: "lightgray",
    borderWidth: 1,
    // borderRadius: 5,
    // borderBottomWidth: 1,
    // marginBottom: 10,
    marginLeft: -2,
    borderRadius: 5,
  },
  modalView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  modalBtn: {
    height: 40,
    width: 70,
    borderRadius: 5,
    // backgroundColor: "lightgray",
    // borderColor: "lightgray",
  },
  location: {
    // height: 40,
    // lineHeight: 40,
    fontSize: 15,
    borderColor: "lightgray",
    // borderBottomWidth: 1,
    // marginBottom: 10,
    marginLeft: 10,
  },
  locationIcon: {
    // marginTop: 12,
    marginLeft: 5,
  },
  addLocation: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 5,
  },
  submit: {
    width: "100%",
    height: 40,
    borderRadius: 50,
    backgroundColor: "#2677e2",
    borderColor: "#2677e2",
  },
  // 叉叉图标
  XMarkIcon: {
    position: "absolute",
    top: 0,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 5,
    color: "white",
  },
});
