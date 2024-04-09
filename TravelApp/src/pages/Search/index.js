import React, { useState, useEffect } from 'react';
import { TextInput, View, FlatList, StyleSheet, Text,TouchableOpacity,Image, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'; // 引入放大镜图标组件
import { searchTravelNote } from '../../apis/user';
import {Toast} from "@ant-design/react-native"

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]); // 用于存储搜索结果
  const [historyItems, setHistoryItems] = useState([]); // 存储搜索历史记录
  const [suggestions, setSuggestions] = useState([]);


  // 使用 useEffect 监听 results 的变化
  // useEffect(() => {
  //   console.log(results);
  // }, [results]); 
  

  const handleSearch = async () => {
    // 首先，去除searchText两边的空格
    const trimmedSearchText = searchText.trim();
  
    // 检查修剪后的searchText是否为空
    if (trimmedSearchText) {
      try {
        const searchResults = await searchTravelNote(trimmedSearchText);
        setResults(searchResults); // 更新状态以显示搜索结果
        addToHistory(trimmedSearchText);
  
      } catch (error) {
        console.error('搜索失败:', error);
      }
    }else{
      // console.log('请输入搜索');
      // 显示一个Toast消息提示
      // Toast.info("请输入搜索内容～", 1);
      Alert.alert('请输入您要搜索的内容～')
      
    }
    // 如果searchText为空或仅包含空格，这里不执行任何操作
  };

   // 添加搜索历史记录
  //  const addToHistory = (text) => {
  //   if (!historyItems.includes(text)) {
  //     setHistoryItems([...historyItems, text]);
      
  //   }
  // };

  const addToHistory = (text) => {
    if (text && !historyItems.includes(text)) {
      setHistoryItems([...historyItems, text]);
    }
  };

  // 渲染搜索历史记录
  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSearchText(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  // 输入框文本改变时处理事件
  const onChangeText = (text) => {
    setSearchText(text);

    // 这里可以写搜索建议列表
    // 例如：setSuggestions(getSuggestionsByText(text))
  };

  const navigation = useNavigation();

  
  return (
    <View style={styles.allcontainer}>
        
        <View style={{
          flexDirection:'row'
        }}>
        {/* 搜索组件 */}
        <TouchableOpacity style={styles.serchandinput}>
        <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
        
        <TextInput
          placeholder='搜索游记、用户...'
          placeholderTextColor={'gray'}
          style={styles.input}
          value={searchText}
          onChangeText={onChangeText}
          onSubmitEditing={handleSearch}
        />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text 
            onPress={() => navigation.goBack()}
            // onPress={() => navigation.navigate("Home")}
            style={{
              color:'gray',
              fontSize:15,
              top:39,
              left:15,
            }}>取消</Text>
          </TouchableOpacity>
        

        </View>
        
        {/* 历史记录Text */}
        <View style={styles.historyText}>
          <Text style={{
          paddingVertical:8, 
          fontWeight:'500', 
          right:2
        }}
          >历史记录</Text>
        </View>
          
        {/* 历史记录按钮 */}
        <View style={{
              marginBottom:10,
              flexDirection:'row',
              flexWrap:'wrap',
            }}>
        
          
            {historyItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => setSearchText(item)} 
                style={styles.historyItem}
                
                >
                <Text style={{
                  textAlign:'center',
                  justifyContent:'space-between',
              }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
      
      {/* 这里渲染模糊搜索的建议列表 */}
      {/* <FlatList 
        data={suggestions}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => String(index)}
      /> */}
      
      <ScrollView>
      <View style={styles.container}>
      {
        // 首先遍历返还的 results(article)
        results.map((item, index) => {
            // 为每篇文章创建 TravelsCard 组件
            return (
              <TravelsCard item={item} key={index} />
            );
          
        })
      }
      </View>
      </ScrollView>
    </View>
  );
};


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
            <Image source={{ uri: `data:image/jpeg;base64,${item.Avatar}` }} style={{height: 16, width: 16, borderRadius:30}} />      
        </View>
            
        <Text style={styles.texttitle}>{item.title}</Text>
        <Text style={styles.text}>{item.profile}</Text>
        
       </TouchableOpacity>
       
  )
}

const styles = StyleSheet.create({
  allcontainer: {
    flex:1,
    backgroundColor: 'white',
    paddingEnd: 14,
    paddingStart: 14,
    paddingTop: 50,
  },
  serchandinput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee', 
    borderRadius: 20, 
    padding: 6,
    paddingLeft: 20, 
    paddingRight: 20,
    marginHorizontal:10,
    marginVertical:10,
    top: 15,
    height:45,
    width:'80%'
},
  input: {
    width:240,
  },
  historyText: {
    marginVertical: 10,
    marginHorizontal:8
    // top:10,
  },
  historyItem: {
    borderWidth: 1, // 边框宽度
    borderColor: '#eee', // 边框颜色
    borderRadius: 20, // 边框圆角（可选）
    paddingHorizontal: 8,
    paddingVertical: 2,
    margin:6,
    maxWidth: 80,
    maxHeight:30,
    flexGrow: 1, // 自适应宽度
  },


  // 卡片区
  container: {
    marginLeft: 8,
    marginRight: 20,
    // width:350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    // top:10,
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
});

export default SearchScreen;