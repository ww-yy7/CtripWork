import {View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import React from "react";
import { travelsData } from "../../constants";
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'




export default function Travels() {
  
  return (
    <View style={styles.container}>
      {/* <Text>游记</Text> */}
      {
        travelsData.map((item, index)=>{
            return (
                <TravelsCard  item={item} key={index} />
            )
        })
      }
    </View>
  )
}


const TravelsCard = ({item})=> {

  const navigation = useNavigation();
  return(
    
    
    <TouchableOpacity 
        onPress={() => navigation.navigate("TravelsDetails",{...item}) }
        style={styles.image}
       >
        <Image
          source={item.image}
          style={{width: 170, height: 230, borderRadius: 35, position: 'absolute'}} />
        
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
      borderBottomLeftRadius: 35, 
      borderBottomRightRadius: 35
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

