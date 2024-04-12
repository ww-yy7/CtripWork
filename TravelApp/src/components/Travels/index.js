import { View, TouchableOpacity, Image, Text, StyleSheet,  ActivityIndicator, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getAllTravelNote } from "../../apis/user";
import { UserContext } from "../../contexts/UserContext";
// 瀑布流组件引入
import WaterfallFlow from "react-native-waterfall-flow";
import { unescapeHtml } from "../../apis/HtmlHandler";
// import MasonryList from 'react-native-masonry-list';

export default function Travels() {
  const { travelsData, setTravelsData, deleteCount} = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);
  const [displayedData, setDisplayedData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 数据加载状态
  
  

  useEffect(() => {
    getAllTravelNote().then((users) => {
      setIsLoading(true);
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
      setIsLoading(false);
    });
  }, [deleteCount]);

  // 瀑布流下拉更新
  const onRefresh = () => {
    setRefreshing(true);
    // 这里执行刷新首页数据（全部已通过游记）的逻辑
    getAllTravelNote()
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
    setTimeout(() => setRefreshing(false), 2000);
  };

  useEffect(() => {
    // 初始化显示的数据
    // setDisplayedData(travelsData.slice(0, 2));
    const initialData = travelsData.slice(0, 4);
    setDisplayedData(initialData);
    setCurrentIndex(4);
  }, [travelsData]);


  const loadMore = () => {
    const nextIndex = currentIndex + 4;
    const newData = travelsData.slice(currentIndex, nextIndex);
    setDisplayedData((prevData) => [...prevData, ...newData]);
    setCurrentIndex(nextIndex);
  };
  

  return (
    
    <View style={styles.container}>
      {/* <SafeAreaView > */}
      
      {/* <WaterfallFlow
        onRefresh={onRefresh}
        refreshing={refreshing}
        // data={travelsData}
        data={displayedData}
        onEndReached={loadMore}
        onEndReachedThreshold={0.01}
        numColumns={2}
        renderItem={({ item, index, columnIndex}) => {
          return (
              <TravelsCard
                item={item}
                key={index}
                columnIndex={columnIndex}
              />
          );
        }}
      /> */}

      {isLoading ? (
              <ActivityIndicator size="small" color="black" /> // 加载中的提示
            ) : (
              <WaterfallFlow
                onRefresh={onRefresh}
                refreshing={isLoading} // 刷新状态
                data={displayedData}
                onEndReached={loadMore}
                onEndReachedThreshold={0.01}
                numColumns={2}
                renderItem={({ item, index, columnIndex }) => (
                  <TravelsCard
                    item={item}
                    key={index}
                    columnIndex={columnIndex}
                  />
                )}
              />
            )}
      
      {/* </SafeAreaView> */}
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
        width: 170, 
        marginHorizontal:6,
        // marginLeft:7,
        // marginRight:7,
        // left:7,
        marginTop:10,
        height: columnIndex === 0 ? 230 : 250,
        // display: "flex",
        
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
          source={{uri: `data:image/jpeg;base64,${item.Avatar}`}}
          style={{ height: 16, width: 16 ,borderRadius: 20}}
        />
      </View>

      <Text style={styles.texttitle}>{unescapeHtml(item.title)}</Text>
      <Text style={styles.text}>{unescapeHtml(item.profile)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  //整个游记卡片瀑布流组件
  container: {
    // justifyContent:'space-between',
    // alignItems:'center',
    // flexDirection:'row',
    height:510,  
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
    right: 3,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    margin: 5,
    color: "white",
  },

  texttitle: {
    left: 10,
    bottom: 60,
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },

  text: {
    left: 10,
    color: "white",
    // fontWeight: 'bold',
    fontSize: 10,
    bottom: 53,
  },
});
