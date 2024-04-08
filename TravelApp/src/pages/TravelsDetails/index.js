import { useEffect, useState } from "react";
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
  ChatBubbleOvalLeftEllipsisIcon
} from "react-native-heroicons/outline";
import { Toast, Provider } from "@ant-design/react-native";
import { HeartIcon, StarIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme";
import SwiperComponent from "../../components/Swiper";
import { unescapeHtml } from "../../apis/HtmlHandler";
// import Swiper from "react-native-swiper";
import { FastForward } from "react-native-feather";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { submitComment as fetchSubmitComment,getAllTravelNote } from "../../apis/user";


export default function TravelsDetails(props) {
  // console.log("item:", props.route.params,'item11'); // 每一篇游记数据
  const item = props.route.params;
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [isCollect, toggleCollect] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [articleData, setArticleData] = useState(); // 游记数据（发请求得到的）
  // 获取当前登录用户的信息
  const {
    id, // 用户id
    userInfo: { nickName, Avatar: commentAvatar }, // 主要是用户个人简介，没有文章信息
    token,
    publish,
    incrementPublishCount,
  } = useContext(UserContext);

  useEffect(() => {
    async function getArticleData() {
      let result = await getAllTravelNote(params={ articleId: item.articleId });
      setArticleData(result.article[0])
      // console.log(articleData.comment.length,'articleData.comment');
    }
    // 获取这一篇游记的数据
    getArticleData();
    // console.log(item.articleId, "item.articleId");

  },[publish]);

  const onShare = async (item) => {
    // console.log("articleId", articleId);
    try {
      const result = await Share.share({
        message: `${item.title}`,
        url: `http://10.100.133.18:5010?articleId=${item.articleId}`,
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

  // 提交评论
  const submitComment = async () => {
    if(!token) {
      Toast.info("请先登录", 1);
      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000);
      return;
    }


    
    // 判断输入是否为空或者是空格
    if (!inputValue.trim()) {
      Toast.info("标签不能为空", 1);
      setInputValue("");
      return;
    }
    const data = {
      articleId: item.articleId,
      comment: {
        id,
        nickName,
        commentAvatar,
        time: Date.now(),
        content: inputValue,
      },
    };
    let result = await fetchSubmitComment(data);
    if (result.data.code === 200) {
      Toast.info("评论成功", 1);
      incrementPublishCount() // 用来刷新评论列表(原本是用在新增游记的)
      setInputValue("");
    }
  };


return (
  <Provider>
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
                  automaticallyAdjustContentInsets={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
          style={styles.scrollview}>
          {/* 标题用户行 */}
          <View style={styles.titleanduserview}>
            <Text style={styles.texttitle}>{unescapeHtml(item?.title)}</Text>
            <View style={styles.userinfo}>
              <Text style={styles.username}>{item.user}</Text>
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.Avatar}` }}
                style={{ height: 25, width: 25, borderRadius:30 }}
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
                <Text className="text-neutral-600 tracking-wide">位置</Text>
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
                <Text className="text-neutral-600 tracking-wide">游玩天数</Text>
              </View>
            </View>

            <View style={styles.price}>
              <Text style={{ fontSize: 25, color: theme.text }}>¥</Text>
              <View>
                <Text style={{ fontSize: 13, color: theme.text }}>
                  {item?.money}
                </Text>
                <Text>花费</Text>
              </View>
            </View>
          </View>

          {/* 游记正文 */}
          <Text style={styles.description}>{unescapeHtml(item?.content)}</Text>
          <View style={{height:30}}>
            <Text style={{
              fontSize:10,
              color:'grey',
              position:'relative',
              top:20
            }}>
              {/* 发布于{item?.time} */}
              发布于{' '}
              {new Date(item.time * 1).toLocaleString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
              </Text>
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
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            placeholder="按下Enter键提交评论"
            placeholderTextColor={"gray"}
            onSubmitEditing={submitComment}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={styles.likeicon}
          onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon
            size={30}
            stroke={isFavourite ? "red" : "black"}
            strokeWidth={1.5}
            color={isFavourite ? "red" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.staricon}
          onPress={() => toggleCollect(!isCollect)}>
          <StarIcon
            size={30}
            stroke={isCollect ? "orange" : "black"}
            strokeWidth={1.5}
            color={isCollect ? "orange" : "white"}
          />
        </TouchableOpacity>

        {/* 评论按钮 */}
        <TouchableOpacity
          style={styles.commentIcon}
          // onPress={()=> toggleCollect(!isCollect)}
        >
          <ChatBubbleOvalLeftEllipsisIcon size={30} stroke={"black"} strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

          {/* 评论区 */}
          <View style={{marginTop:-15}}>
            <View><Text style={{ fontSize: 16, fontWeight: "bold" }}>评论区</Text></View>
            {articleData?.comment?.map((comment, index) => (
              <View key={index} style={{ flexDirection: "row", marginTop: 10 }}>
                <Image
                  source={{ uri: `data:image/jpeg;base64,${comment.commentAvatar}` }}
                  style={{ height: 30, width: 30, borderRadius: 30 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {comment.nickName}
                  </Text>
                  <Text style={{ fontSize: 14 }}>{comment.content}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{height:50}}></View>
        </ScrollView>
      </View>
      
      <View style={{height:50}}></View>

    </View>
  </Provider>
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
    height: "50%",
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // top: 40
  },
  scrollview: {
    flexDirection: "column", // 假设是垂直方向的空间间隔
    marginBottom: 5,
    height: 390,
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
    color: 'gold',
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
    marginTop: 20,
    marginLeft: -20,
  },
  commentview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
    padding: 8,
    left: 20,
    bottom: 20,
    width: "65%",
    paddingLeft: 10,
  },
  likeicon: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 8,
    // borderRadius: '100%',
    marginRight: 16,
    bottom: 19,
    left: 20,
  },
  staricon: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 8,
    // borderRadius: '100%',
    marginRight: 16,
    bottom: 19,
    right: 10,
  },

  commentIcon: {
    backgroundColor: "rgba(255,255,255,0.5)",
    // paddingHorizontal: 8,
    // borderRadius: '100%',
    // marginRight: 16,
    bottom: 19,
    right: 30,
  },
  input: {
    width: "100%",
    padding: 5,
    fontSize: 15,
  },
});
