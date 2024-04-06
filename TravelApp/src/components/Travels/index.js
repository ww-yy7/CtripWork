import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getAllTravelNote } from "../../apis/user";
import { UserContext } from "../../contexts/UserContext";
// 瀑布流组件引入
import WaterfallFlow from "react-native-waterfall-flow";
// import MasonryList from 'react-native-masonry-list';

export default function Travels() {
  const { travelsData, setTravelsData } = useContext(UserContext);

  useEffect(() => {
    getAllTravelNote().then((users) => {
      // 使用 flatMap 提取每个用户的所有游记，合并成一个数组
      const allArticles = users.flatMap((user) => user.article);
      // console.log(allArticles)
      // 对合并后的游记数组进行排序
      const sortedArticles = allArticles.sort(
        (a, b) => parseInt(b.time) - parseInt(a.time)
      );
      const filteredData = sortedArticles.filter(
        (article) => article.state === "已通过"
      );
      // console.log(b.time)
      // 更新状态以存储排序后的游记数据
      setTravelsData(filteredData);
    });
  }, []);

  return (
    <View style={styles.container}>
      <WaterfallFlow
        data={travelsData}
        numColumns={2}
        renderItem={({ item, index, columnIndex }) => {
          return (
            
             
              <TravelsCard
                item={item}
                key={index}
                columnIndex={columnIndex}
                // style={{
                //   height: columnIndex === 0 ? 230 :250,
                // }}
              />
               
            
          );
        }}
      />
    </View>
  );
}

const TravelsCard = ({ item, columnIndex }) => {
  const navigation = useNavigation();
  // console.log(columnIndex, "columnIndex");
  // console.log(item, "item");
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("TravelsDetails", { ...item })}
      style={{
        width: 170, //固定宽度可兼容iphone15和iphone15promax
        height: columnIndex === 0 ? 230 : 250,
        display: "flex",
        marginBottom: 10,
        alignItems: "flex-start",
      }
      }>
      <Image
        suppressHydrationWarning={true} // 消除source的警告
        // source={item.picture}
        source={{ uri: `data:image/jpeg;base64,${item.picture[0]}` }} // base64
        style={{
          width: 170,
          height: "100%",
          borderRadius: 10,
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
          source={require("../../../assets/images/avatar.png")}
          style={{ height: 16, width: 16 }}
        />
      </View>

      <Text style={styles.texttitle}>{item.title}</Text>
      <Text style={styles.text}>{item.profile}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  //整个游记卡片瀑布流组件
  container: {
    paddingLeft:8,
    // paddingRight:8,
    // width:350,
    flexDirection: "row",
    justifyContent: "space-between",
    // flexWrap: "wrap",
  },
  lineargradient: {
    bottom: 0,
    width: 170,
    height: "100%", // 渐变色高度
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    
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
    bottom: 40,
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },

  text: {
    left: 10,
    color: "white",
    // fontWeight: 'bold',
    fontSize: 10,
    bottom: 35,
  },
});
