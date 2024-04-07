import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Share,
} from "react-native";
import {
  ChevronLeftIcon,
  ShareIcon,
  MapPinIcon,
  ClockIcon,
  PencilIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import { HeartIcon, StarIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme";
import SwiperComponent from "../../components/Swiper";
// import Swiper from "react-native-swiper";
import { FastForward } from "react-native-feather";

export default function TravelsDetails(props) {
  console.log("item:", props.route.params);
  const item = props.route.params;
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [isCollect, toggleCollect] = useState(false);

  const onShare = async (item) => {
    // console.log("articleId", articleId);
    try {
      const result = await Share.share({
        message: `${item.title}`,
        url: `http://10.100.197.143:7831?articleId=${item.articleId}`,
        // url: `http://10.100.197.143:7864`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View>
      {/* <Image source={item.article[0].picture} style={styles.imagecontainer}/> */}
      <SwiperComponent item={item}></SwiperComponent>

      <SafeAreaView style={styles.safeareaview}>
        {/* 返回按钮 */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.lefttouchableopacity}>
          <ChevronLeftIcon size={20} strokeWidth={4} color="white" />
        </TouchableOpacity>

        {/* 分享按钮 */}
        <TouchableOpacity
          onPress={() => onShare(item)}
          style={styles.righttouchableopacity}>
          <ShareIcon size={20} strokeWidth={4} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* 标题用户&位置时间预算&游记正文 */}
      <View style={styles.contentcontainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}>
          {/* 标题用户行 */}
          <View style={styles.titleanduserview}>
            <Text style={styles.texttitle}>{item?.title}</Text>
            <View style={styles.userinfo}>
              <Text style={styles.username}>{item.user}</Text>
              <Image
                source={require("../../../assets/images/avatar.png")}
                style={{ height: 25, width: 25 }}
              />
            </View>
          </View>

          {/* 位置时间预算行 */}
          <View style={styles.pdpview}>
            <TouchableOpacity
              style={styles.position}
              className="flex-row space-x-2 items-start">
              <MapPinIcon size={25} color="#f87171" />
              <View className="flex space-y-2">
                <Text
                  style={{ fontSize: 13 }}
                  className="font-bold text-neutral-700">
                  {item.position}
                </Text>
                <Text style={{fontSize:11 ,top:3}}>位置</Text>
              </View>
            </TouchableOpacity>

            <View
              style={styles.duration}
              className="flex-row space-x-2 items-start">
              <ClockIcon size={25} color="skyblue" />
              <View className="flex space-y-2">
                <Text
                  style={{ fontSize: 13 }}
                  className="font-bold text-neutral-700">
                  {item.playTime}
                </Text>
                <Text style={{fontSize:11 ,top:3}}>游玩天数</Text>
              </View>
            </View>

            <View style={styles.price}>
              <Text style={{ fontSize: 25, color: theme.text }}>¥</Text>
              <View>
                <Text style={{ fontSize: 13, color: theme.text }}>
                  {item?.money}
                </Text>
                <Text style={{fontSize:11 ,top:3}}>花费</Text>
              </View>
            </View>
          </View>

          {/* 游记正文 */}
          <Text style={styles.description}>{item?.content}</Text>
        </ScrollView>
      </View>

      {/* 评论 点赞 收藏 */}
      <View style={styles.clcview}>
        <View style={styles.commentview}>
          <PencilIcon
            size={13}
            strokeWidth={1}
            color="gray"
            style={{ margin: 2 }}
          />
          <TextInput
            placeholder="说点什么..."
            placeholderTextColor={"gray"}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={styles.likeicon}
          onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon
            size={28}
            stroke={isFavourite ? "red" : "black"}
            strokeWidth={1.5}
            color={isFavourite ? "red" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.staricon}
          onPress={() => toggleCollect(!isCollect)}>
          <StarIcon
            size={28}
            stroke={isCollect ? "orange" : "black"}
            strokeWidth={1.5}
            color={isCollect ? "orange" : "white"}
          />
        </TouchableOpacity>

        {/* 编辑按钮，如果是当前用户自己的游记则显示 */}
        <TouchableOpacity
          style={styles.editicon}
          // onPress={()=> toggleCollect(!isCollect)}
        >
          <PencilSquareIcon size={28} stroke={"black"} strokeWidth={1.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 图片区
  imagecontainer: {
    backgroundColor: "white",
    flexGrow: 1,
    width: "100%",
    height: "55%",
  },
  lefttouchableopacity: {
    padding: 8,
    borderRadius: 20,
    marginRight: 16,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  safeareaview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    marginTop: 10,
    left: 10,
  },
  righttouchableopacity: {
    padding: 8,
    borderRadius: 20,
    marginRight: 20,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  // 内容区
  contentcontainer: {
    paddingHorizontal: 20, // px-5 对应 padding-left 和 padding-right
    flexGrow: 1,
    flexDirection: "row", // 默认值，为了明确表示为flex布局
    justifyContent: "space-between",
    backgroundColor: "white", // bg-white 对应 background-color
    height: "41%",
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // top: 40
  },
  scrollview: {
    flexDirection: "column", // 假设是垂直方向的空间间隔
    marginBottom: 5,
    height: 413,
  },
  titleanduserview: {
    flexDirection: "row", // flex-row 对应 flexDirection: 'row'
    justifyContent: "space-between", // justify-between 对应 justifyContent: 'space-between'
    alignItems: "flex-start",
    marginTop: 30,
  },
  texttitle: {
    fontWeight: "bold", // font-bold 对应 fontWeight
    flexGrow: 1, // flex-1 对应 flexGrow
    color: "#aaa",
    fontSize: 25,
  },
  userinfo: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
    alignItems: "center",
    right: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
    color: '#bbb',
  },

  pdpview: {
    flexDirection: "row",
    justifyContent: "space-between",
    top: 10,
    marginVertical: 15,
    paddingHorizontal: 10,

    right: 5,
  },
  position: {
    flexDirection: "row",
    paddingHorizontal: 0,
  },
  duration: {
    flexDirection: "row",
  },
  price: {
    flexDirection: "row",
  },

  description: {
    // color: '#aaa',
    letterSpacing: 1,
    marginTop: 16,
  },

  // 评论点赞区
  clcview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: "10%",
  },
  commentview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
    padding: 8,
    left: 20,
    bottom: 20,
    width: "55%",
    paddingLeft: 10,
  },
  likeicon: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 8,
    borderRadius: '100%',
    marginRight: 16,
    bottom: 19,
    left: 20,
  },
  staricon: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 8,
    borderRadius: '100%',
    marginRight: 16,
    bottom: 19,
    right: 10,
  },

  editicon: {
    backgroundColor: "rgba(255,255,255,0.5)",
    // paddingHorizontal: 8,
    borderRadius: '100%',
    // marginRight: 16,
    bottom: 19,
    right: 30,
  },
});
