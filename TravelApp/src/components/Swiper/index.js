import React from 'react';
import { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';




// 定义SwiperComponent并添加item作为prop类型
// SwiperComponent.propTypes = {
//     item: PropTypes.object.isRequired,
//   };

export default function SwiperComponent ({item}) {
  
  const pic = item.picture
  // console.log(item.article[0].picture[0])
  return(
  <View style={styles.swiper}>
  <Swiper >
    {pic.map((picitem,index) => (
      <Image
        key={index}
        // source={{uri: picitem}}
        source={{ uri: `data:image/jpeg;base64,${picitem}` }} 
        style={styles.imagecontainer}
        resizeMode="cover"
        />
    ))}
    
  </Swiper>
  </View>
  )


}

const styles = StyleSheet.create({
  swiper:{
    backgroundColor: 'white',
    flexGrow: 1,
    width: '100%',
    height: '55%',
  },
  imagecontainer:{
    backgroundColor: 'white',
    flexGrow: 1,
    width: '100%',
    height: '55%'
  },
})

