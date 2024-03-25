import {View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import React from "react";
import { travelsData } from "../../constants";


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
  return(
    <TouchableOpacity style={styles.image}
       >
        <Image
          source={item.image}
          style={{width: 170, height: 230, borderRadius: 35}} />
       </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
      marginLeft: 15,
      marginRight: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'warp',
      width: 50
    },
    image: {
      width: 170,
      height: 230,
      display: 'flex', 
      justifyContent: 'flex-end', 
      position: 'relative', 
      paddingHorizontal: 4, 
      paddingTop: 6, 
      paddingBottom: 6, 
      marginBottom: 5, // 等同于 className="mb-5" (下外边距)
      alignSelf: 'stretch', // （可选，如果需要填充整个父容器宽度）
      alignItems: 'flex-start', // 
    }
  
})

