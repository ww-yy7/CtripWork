import React from "react";
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
import {
  AddTravel as fetchAddTravel,
  UpdateTravel as fetchUpdateTravel,
} from "../../apis/user";
import { useNavigation } from "@react-navigation/native";
import { escapeHtml } from "../../apis/HtmlHandler";

import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

export default function AddorUpdateTravel({ userInfo }) {
  // console.log(userInfo, 'userInfo');
  // // 判断是否是修改游记
  // 修改
  // const {articleId,title,profile,content,tags,picture,position,playTime,money} = userInfo;
  // const { articleId } = userInfo; // 仅修改游记时使用
  // console.log(articleId, "articleId");
  const {
    id: _id,
    userInfo: { nickName },
    token,
    incrementPublishCount,
  } = useContext(UserContext);
  const navigation = useNavigation();

  const [titleValue, setTitleValue] = useState(
    userInfo && userInfo.title ? userInfo.title : ""
  );
  const [profileValue, setProfileValue] = useState(
    userInfo && userInfo.profile ? userInfo.profile : ""
  );
  const [contentValue, setContentValue] = useState(
    userInfo && userInfo.content ? userInfo.content : ""
  );

  const [tags, setTags] = useState(
    userInfo && userInfo.tags ? userInfo.tags : []
  ); // 存放标签
  const [tagVisible, setTagVisible] = useState(false); // 标签弹出框是否显示
  const [tagInputValue, setTagInputValue] = useState(""); // 标签输入框的值

  const [locationVisible, setLocationVisible] = useState(false); // 地点弹出框是否显示
  const [locationValue, setLocationValue] = useState(
    userInfo && userInfo.position ? userInfo.position : ""
  ); // 地点显示的值
  const [locationInputValue, setLocationInputValue] = useState(""); // 地点输入框的值

  const [playTime, setPlayTime] = useState(
    userInfo && userInfo.playTime ? userInfo.playTime : ""
  ); // 游玩时间
  const [playTimeVisible, setPlayTimeVisible] = useState(false); // 游玩时间弹出框是否显示
  const [playTimeInputValue, setPlayTimeInputValue] = useState(""); // 游玩时间输入框的值

  const [money, setMoney] = useState(
    userInfo && userInfo.playTime ? userInfo.playTime : ""
  ); // 花费
  const [moneyVisible, setMoneyVisible] = useState(false); // 花费弹出框是否显示
  const [moneyInputValue, setMoneyInputValue] = useState(""); // 花费输入框的值

  const [checked, setChecked] = useState(false); // 是否同意发布规则
  const [imageList, setImageList] = useState(
    userInfo && userInfo.picture ? userInfo.picture : []
  ); // 移动端展示的图片

  // 选择图片
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true, // 是否允许编辑
      aspect: [4, 3], // 裁剪比例
      quality: 0.1, // 图片质量
      base64: true, // 是否返回base64
    });

    // console.log(result.assets[0].base64,'pictureResult');
    if (!result.canceled) {
      setImageList([...imageList, result.assets[0].base64]); // 这个是在手机上显示图片 存base64
      // setImageList([...imageList, result.assets[0].uri]);  //这个是在手机上显示图片 存uri地址
    }
  };
  // 删除图片
  const deleteOnePicture = (index) => {
    let list = imageList;
    list.splice(index, 1);
    setImageList([...list]);
  };

  // 提交游记
  const submitTravelNote = async () => {
    if (imageList.length === 0) {
      Toast.info("请上传图片", 1);
    } else if (!titleValue) {
      Toast.info("标题不能为空", 1);
    } else if (!contentValue) {
      Toast.info("内容不能为空", 1);
    } else if (!checked) {
      Toast.info("请同意发布规则", 1);
    } else {
      // 发布、更新游记
      if (userInfo) {
        // 更新游记
        const res = await fetchUpdateTravel({
          articleId: userInfo.articleId,
          article: {
            title: titleValue,
            profile: profileValue,
            content: escapeHtml(contentValue),
            tags: tags,
            picture: imageList,
            position: locationValue,
            playTime: playTime,
            money: money,
          },
        });

        console.log(res.data.code, "res.code");

        if (res.data.code === 200) {
          incrementPublishCount();
          Toast.info("更新成功", 1);
          navigation.navigate("Mine");
        } else {
          Toast.info("更新失败", 1);
        }
      } else {
        const data = {
          _id, // 发布游记的用户ID
          user: nickName,
          title: escapeHtml(titleValue),
          profile: escapeHtml(profileValue),
          content: escapeHtml(contentValue),
          tags: tags,
          picture: imageList,
          position: escapeHtml(locationValue),
          playTime: escapeHtml(playTime),
          money: escapeHtml(money),
        };
        let res = await fetchAddTravel(data);

        // console.log(res.data);
        if (res.data.code === 200) {
          incrementPublishCount();
          Toast.info("发布成功", 1);

          setTimeout(() => {
            navigation.navigate("Mine");
            // 清除所有内容
            setTitleValue("");
            setProfileValue("");
            setContentValue("");
            setTags([]);
            setImageList([]);
            setLocationValue("");
            setPlayTime("");
            setMoney("");
            setChecked(false);
          }, 1000);
        } else {
          Toast.info("发布失败,请稍后重试", 1);
        }
      }
    }
  };

  if (token) {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "rgb(255,255,255)" }}>
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

        <View
          style={[styles.innerBox, { flexDirection: "row", flexWrap: "wrap" }]}>
          {imageList.length > 0 &&
            imageList.map((item, index) => (
              <View key={index}>
                <Image
                  key={item}
                  source={{ uri: `data:image/jpeg;base64,${item}` }} // base64
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

        <View style={[styles.container, { height: 560 }]}>
          <View style={[styles.innerBox, { height: 380 }]}>
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
              style={{ flex: 1, height: 200 }}
              automaticallyAdjustContentInsets={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <List>
                <TextareaItem
                  style={{ borderTopWidth: 0.5, borderColor: "lightgray" }} // 添加这行样式设置 // 添加这行样式设置，去掉下划线
                  rows={8}
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

          <View style={[styles.innerBox, { height: 120 }]}>
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
                <Text
                  style={styles.location}
                  onPress={() => setMoneyVisible(true)}>
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
                <Text
                  style={styles.location}
                  onPress={() => setMoneyVisible(true)}>
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
          <View style={[styles.innerBox, { height: 35 }]}>
            <Button
              onPress={submitTravelNote}
              style={styles.submit}
              type="primary">
              发布游记
            </Button>
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
                onChangeText={(text) => setTagInputValue(text)}
                value={tagInputValue}
                placeholder="填写标签"
              />
              <Button
                style={[
                  styles.modalBtn,
                  {
                    backgroundColor: tagInputValue ? "#2677e2" : "lightgray",
                    borderColor: tagInputValue ? "#2677e2" : "lightgray",
                  },
                ]}
                type="primary"
                onPress={() => {
                  if (tagInputValue) {
                    setTags([...tags, tagInputValue]);
                    setTagInputValue("");
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
              style={{
                backgroundColor: "#2677e2",
                borderColor: "#2677e2",
              }}>
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
                      ? "#2677e2"
                      : "lightgray",
                    borderColor: locationInputValue ? "#2677e2" : "lightgray",
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
                backgroundColor: "#2677e2",
                borderColor: "#2677e2",
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
                      ? "#2677e2"
                      : "lightgray",
                    borderColor: playTimeInputValue ? "#2677e2" : "lightgray",
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
                backgroundColor: "#2677e2",
                borderColor: "#2677e2",
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
                    backgroundColor: moneyInputValue ? "#2677e2" : "lightgray",
                    borderColor: moneyInputValue ? "#2677e2" : "lightgray",
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
                backgroundColor: "#2677e2",
                borderColor: "#2677e2",
              }}>
              关闭
            </Button>
          </Modal>
        </Provider>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/addTravel.png")}
          style={{ width: 200, height: 160, marginTop: 50 }}
        />
        <Text style={{ fontSize: 16, marginTop: 10 }}>登录以添加游记</Text>
        <Button
          style={styles.btn_login}
          onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "black", fontSize: 16 }}>登录/注册</Text>
        </Button>
      </View>
    );
  }
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
    // backgroundColor: "",
    width: "95%",
    marginBottom: 5,
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
    fontSize: 24,
    fontWeight: "500",
    borderColor: "lightgray",
    // borderWidth: 1,
    // borderRadius: 5,
    borderBottomWidth: 0.5,
    marginBottom: 10,
    marginLeft: 10,
  },
  profileInput: {
    height: 30,
    fontSize: 18,
    borderColor: "lightgray",
    marginBottom: 10,
    marginLeft: 10,
  },
  Alltags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  tags: {
    marginLeft: 5,
  },
  btn: {
    backgroundColor: "rgb(255,255,255)",
    // color:'lightgray',
    width: 70,
    height: 25,
    borderWidth: 1,
    borderColor: "rgb(233,233,233)",
    borderRadius: 5,
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
    fontSize: 15,
    borderColor: "lightgray",
    marginLeft: 10,
  },
  locationIcon: {
    // marginTop: 12,
    marginLeft: 5,
  },
  addLocation: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
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
  btn_login: {
    width: 200,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    borderColor: "#2677e2",
    marginTop: 210,
    position: "absolute",
    top: 50,
  },
});