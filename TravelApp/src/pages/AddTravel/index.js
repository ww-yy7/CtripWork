import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient'
import { TrashIcon } from "react-native-heroicons/outline";
import { travelsdefaultData } from "../../constants";





export default function MyTravels() {
   
  const [travelsData,setTravelsData] = useState(travelsdefaultData)

  // 定义删除游记的函数
  const deleteMyTravel = (idToDelete) => {
        // 过滤出要删除的游记后，更新全局状态
        setTravelsData(currentTravelsData => currentTravelsData.filter(item => item.articleId !== idToDelete));
      };

  return (
    <ScrollView style={styles.container}>
    <View style={styles.cardcontainer}>
      {
        travelsData.length > 0 && travelsData.filter(item => item.user === 'Zach').map((item, index) => (
            <TravelsCard key={index} item={item} onDelete={deleteMyTravel}/>
          ))
      }
    </View>
    </ScrollView>
  )
}


const TravelsCard = ({item, onDelete})=> {

  const navigation = useNavigation();
  
  const confirmDelete = (id) => {
    Alert.alert(
      '确认删除',
      '确定要删除这条游记吗？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确定',
          onPress: () => onDelete(id),
        },
      ],
      { cancelable: false },
    );
  };
  

  return(
    
    <View>
    <TouchableOpacity 
        onPress={() => navigation.navigate("TravelsDetails",{...item}) }
        style={styles.imageview}
       >
        <Image
          source={item.image}
          style={{width: 170, height: 230, borderTopLeftRadius: 10, borderTopRightRadius: 10, position: 'absolute'}} />
        
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
        <Text style={styles.text}>{item.shortDescription}</Text>
        
       </TouchableOpacity>

        <View style={styles.states}>
          <Text>审核中</Text>
          <TouchableOpacity onPress={()=>{confirmDelete(item.articleId)}}>
            <TrashIcon size={15} color="gray"></TrashIcon>
          </TouchableOpacity>
        </View>

       </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingEnd: 14,
    paddingStart: 14,
  },
  cardcontainer: {
    marginLeft: 8,
    marginRight: 8,
    marginTop:10,
    // width:350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  imageview: {
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
    height: '50%',  // 渐变色高度
    // borderBottomLeftRadius: 5, 
    // borderBottomRightRadius: 5
  },
  states:{
    width: 170,  //固定宽度可兼容iphone15和iphone15promax
    height: 43,
    flexDirection:'row',
    justifyContent: 'space-between', 
    position: 'relative', 
    marginBottom: 5,
    alignItems: 'center', 
    bottom:10,
    backgroundColor:"#fff",
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15,
    paddingHorizontal:8,
   
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