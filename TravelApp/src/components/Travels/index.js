import {View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import React,{useContext,useEffect} from "react";
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { getAllTravelNote } from "../../apis/user";
import { UserContext } from "../../contexts/UserContext";
// 瀑布流组件引入
import WaterfallFlow from 'react-native-waterfall-flow'
import MasonryList from 'react-native-masonry-list';



export default function Travels() {

  const {travelsData, setTravelsData} = useContext(UserContext);
  
  useEffect(() => {
    getAllTravelNote()
    .then((users) => {
      // 使用 flatMap 提取每个用户的所有游记，合并成一个数组
      const allArticles = users.flatMap(user => user.article);
      // console.log(allArticles)
      // 对合并后的游记数组进行排序
      const sortedArticles = allArticles.sort((a, b) => parseInt(b.time) - parseInt(a.time));
      // console.log(b.time)
      // 更新状态以存储排序后的游记数据
      setTravelsData(sortedArticles);
    })

  }, []);
  

  // const extractApprovedArticles = (data) =>
  //   data.flatMap(item => item.article.filter(articleItem => articleItem.state === '已通过'));

  // const approvedArticles = extractApprovedArticles(travelsData);

  // const renderItem = ({ item }) => (
  //   <TravelsCard item={item} />
  // );
  console.log(travelsData.length, 'travelsData.length');
  
  return (
    <View style={styles.container}>
      {/* {
        // 首先遍历 travelsData
        travelsData.map((item, itemIndex) => {
          // 然后对于每个 item，遍历其 article 属性
          return item.article.map((articleItem, articleIndex) => {
            if (articleItem.state === '已通过'){
            // 为每篇文章创建 TravelsCard 组件
            return (
              <TravelsCard item={articleItem} key={`${itemIndex}-${articleIndex}`} />
            );
          }
          });
        })
      } */}
      {
    travelsData.map((article, index) => {
      if (article.state === '已通过') {
        return <TravelsCard item={article} key={index} />;
      }
    })
  }
    </View>
  )

  // return (
  //       <View style={styles.container}>
  //         <MasonryList
  //           style={{height:1000}}
  //           data={approvedArticles}
  //           renderItem={renderItem}
  //           numColumns={2} // 根据需要调整列数
  //           columnWidth={500} // 调整列宽，减去两边的间距
  //           keyExtractor={(item, index) => `article_${index}`}
  //         />
  //       </View>
  //     );
}


const TravelsCard = ({item})=> {

  const navigation = useNavigation();
  

  return(
    <TouchableOpacity 
        onPress={() => navigation.navigate("TravelsDetails",{...item}) }
        style={styles.image}
       >
        <Image
          suppressHydrationWarning={true}  // 消除source的警告
          // source={item.picture}
          source={{ uri: `data:image/jpeg;base64,${item.picture[0]}` }} // base64
          style={{width: 170, height: 230, borderRadius: 25, position: 'absolute'}} />
        
        {/* 线性渐变处理，美化样式 */}
        <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.lineargradient}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}         
            />


        <View style={styles.userinfo}>
            <Text style={styles.title}>{item.user}</Text>          
            <Image source={require('../../../assets/images/avatar.png')} style={{height: 16, width: 16}} />      
        </View>
            
        <Text style={styles.texttitle}>{item.title}</Text>
        <Text style={styles.text}>{item.profile}</Text>
        
       </TouchableOpacity>
       
  )
}

const styles = StyleSheet.create({
    //整个游记卡片瀑布流组件
    container: {
      marginLeft: 8,
      marginRight: 20,
      // width:350,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    image: {
      width: 160,  //固定宽度可兼容iphone15和iphone15promax
      height: 230,
      display: 'flex', 
      justifyContent: 'flex-end', 
      position: 'relative', 
      paddingHorizontal: 4, 
      paddingTop: 6,   // 能改变渐变色
      paddingBottom: 0, 
      marginBottom: 10,
      alignItems: 'flex-start', 
    },
    lineargradient: {
      position:'absolute',
      bottom: 0,
      width: 170, 
      height: '93%',  // 渐变色高度
      borderBottomLeftRadius: 25, 
      borderBottomRightRadius: 25
    },

    userinfo: {
      flexDirection: 'row',
      position: 'absolute',
      justifyContent: 'space-between',
      alignItems: 'center',
      top:7,
      right:2,
    },
    title: {
      fontSize: 11,
      fontWeight: 'bold',
      margin: 5,
      color: 'white',
    },

    texttitle: {
      left:10,
      bottom:30,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15,
    },

    text: {
      left:10,
      color: 'white',
      // fontWeight: 'bold',
      fontSize: 10,
      bottom: 20,
    },
        
        
     
  
})

