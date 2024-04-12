import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { TrashIcon, PencilSquareIcon } from "react-native-heroicons/outline";
import { getAllTravelNote } from "../../apis/user";
import { UserContext } from "../../contexts/UserContext";
import { deleteTravelNote } from "../../apis/user";
import { unescapeHtml } from "../../apis/HtmlHandler";

// 自定义vw vh函数
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const vw = (percentageWidth) => {
  return (screenWidth * percentageWidth) / 100;
};

const vh = (percentageHeight) => {
  return (screenHeight * percentageHeight) / 100;
};

export default function MyTravels() {
  const navigation=useNavigation()
  const { token, id, publish, deleteCount, incrementDeleteCount } =
    useContext(UserContext);
  const { mytravelsData, setMyTravelsData } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      getAllTravelNote({ _id: id }).then((users) => {
        // 使用 flatMap 提取每个用户的所有游记，合并成一个数组
        const allArticles = users.article;
        // console.log(allArticles)
        // 对合并后的游记数组进行排序
        const sortedArticles = allArticles.sort(
          (a, b) => parseInt(b.time) - parseInt(a.time)
        );
        // 更新状态以存储排序后的游记数据
        setMyTravelsData(sortedArticles);
      });
    }
  }, [id, publish, deleteCount]); // 将 token 添加到依赖数组中，这样每当 token 变化时都会重新获取游记数据

  const deleteMyTravel = async (idToDelete) => {
    try {
      await deleteTravelNote(idToDelete); // 先调用接口删除游记
      incrementDeleteCount();
      setMyTravelsData((currentTravelsData) =>
        currentTravelsData.filter((item) => item.articleId !== idToDelete)
      ); // 接口调用成功后，过滤并更新全局状态
    } catch (error) {
      console.error("删除游记失败:", error.message || error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 如果游记数量为0，显示一张图片 */}
      <View>
      {mytravelsData.length === 0 && (
        <TouchableOpacity onPress={()=>{navigation.navigate('AddTravel')}}>
        <Image
          source={require("../../../assets/images/mine_1.jpg")}
          style={{
            width: vw(100),
            height: vh(12),
            alignSelf: "center",
          }}
        />
        </TouchableOpacity>
      )}
      </View>
      <View style={styles.cardcontainer}>
        {
          // 首先遍历 travelsData
          mytravelsData.length > 0 &&
            mytravelsData.map((item, index) => {
              // 为每篇文章创建 TravelsCard 组件
              return (
                <TravelsCard
                  item={item}
                  key={item.articleId || index}
                  onDelete={deleteMyTravel}
                />
              );
            })
        }
      </View>
    </ScrollView>
  );
}

const TravelsCard = ({ item, onDelete }) => {
  // 这里的item是我点击的那个游记的数据
  const navigation = useNavigation();
  const [rejectReason, setRejectReason] = useState("");

  // const toggleModal = () => setIsModalVisible(!isModalVisible);

  const confirmDelete = (id) => {
    Alert.alert(
      "确认删除",
      "确定要删除这条游记吗？",
      [
        {
          text: "取消",
          style: "cancel",
        },
        {
          text: "确定",
          onPress: () => onDelete(id),
        },
      ],
      { cancelable: false }
    );
  };

  const RejectAlert = () => {
    // 定义 editHandler 函数
    const editHandler = () => {
      navigation.navigate("UpdateTravel", { ...item });
    };

    Alert.alert(
      "未通过",
      item.rejectReason,
      [
        {
          text: "取消",
          style: "cancel",
        },
        {
          text: "重新编辑",
          onPress: editHandler,
        },
        // {
        //   text: '删除',
        //   onPress: () => confirmDelete(id),
        // },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("TravelsDetails", { ...item })}
        style={styles.imageview}>
        <Image
          // source={item.picture[0]}
          source={{ uri: `data:image/jpeg;base64,${item.picture[0]}` }}
          style={{
            width: 170,
            height: 230,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            position: "absolute",
          }}
        />

        {/* 线性渐变处理，美化样式 */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.lineargradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        <View style={styles.userinfo}>
          <Text style={styles.title}>{item.user}</Text>
          <Image
            source={{ uri: `data:image/jpeg;base64,${item.Avatar}` }}
            style={{ height: 16, width: 16, borderRadius: 30 }}
          />
        </View>

        <Text style={styles.texttitle}>{unescapeHtml(item.title)}</Text>
        <Text style={styles.text}>{unescapeHtml(item.profile)}</Text>
      </TouchableOpacity>

      <View style={styles.states}>
        {(() => {
          switch (item.state) {
            case "待审核": {
              // 这边也就是返回一个组件了
              const editHandler = () => {
                navigation.navigate("UpdateTravel", { ...item });
              };
              return (
                <>
                  <Text>审核中</Text>
                  {/* 编辑按钮 */}
                  <TouchableOpacity>
                    <PencilSquareIcon
                      onPress={editHandler}
                      size={15}
                      color="gray"
                      style={{ left: 33 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => confirmDelete(item.articleId)}>
                    <TrashIcon size={15} color="gray" />
                  </TouchableOpacity>
                </>
              );
            }
            case "未通过":
              // 返回编辑组件了
              const editHandler = () => {
                navigation.navigate("UpdateTravel", { ...item });
              };
              return (
                <>
                  <View>
                    <TouchableOpacity
                      // onPress={toggleModal}
                      onPress={RejectAlert}>
                      <Text style={{ color: "red" }}>未通过(查看原因)</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity>
                    <PencilSquareIcon
                      onPress={editHandler}
                      size={15}
                      color="gray"
                    />
                  </TouchableOpacity>

                  {/* 编辑按钮 */}
                  <TouchableOpacity
                    onPress={() => confirmDelete(item.articleId)}>
                    <TrashIcon size={15} color="gray" />
                  </TouchableOpacity>
                </>
              );
            case "已通过":
              return (
                <>
                  <Text style={{ color: "green" }}>已通过</Text>
                  <TouchableOpacity
                    onPress={() => confirmDelete(item.articleId)}>
                    <TrashIcon size={15} color="gray" />
                  </TouchableOpacity>
                  {/* 已通过则不可编辑，这里不显示编辑按钮 */}
                </>
              );
            default:
              return <Text>未知状态</Text>;
          }
        })()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#FAFAFA",
    paddingEnd: 12,
    paddingStart: 12,
    minHeight: 550,
  },
  cardcontainer: {
    marginLeft: 8,
    marginRight: 8,
    // width:350,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    top: 10,
  },
  imageview: {
    width: 160, //固定宽度可兼容iphone15和iphone15promax
    height: 230,
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
    paddingHorizontal: 4,
    paddingTop: 6, // 能改变渐变色
    paddingBottom: 0,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  lineargradient: {
    position: "absolute",
    bottom: 0,
    width: 170,
    height: "50%", // 渐变色高度
    // borderBottomLeftRadius: 5,
    // borderBottomRightRadius: 5
  },
  states: {
    width: 170, //固定宽度可兼容iphone15和iphone15promax
    height: 43,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: 5,
    alignItems: "center",
    bottom: 10,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 8,
  },

  userinfo: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
    alignItems: "center",
    top: 7,
    right: 2,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    margin: 5,
    color: "white",
  },

  texttitle: {
    left: 10,
    bottom: 30,
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },

  text: {
    left: 10,
    color: "white",
    // fontWeight: 'bold',
    fontSize: 10,
    bottom: 20,
  },
});
