import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import {theme} from '../../theme'
import { categoriesData } from '../../constants'


export default function Categories() {
  return (
    <View style={styles.precontainer}>
      <View style={styles.container}>
      <Text style={styles.categories_text}>类别</Text>
      <TouchableOpacity>
        <Text style={{fontSize: 14, color: theme.text}} >查看全部</Text>
      </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 15}}
        showsHorizontalScrollIndicator={false}
        >
          {
            categoriesData.map((cat,index)=>{
              return(
                <TouchableOpacity key={index} style ={styles.categories_item}>
                  <Image source = {cat.image} style = {styles.roundedElement}></Image>
                  <Text>{cat.title}</Text>
                </TouchableOpacity>
                
              )
            })
          }
      </ScrollView>
      
    </View>
  )
}


const styles = StyleSheet.create({
  precontainer:{
    marginTop:30,
    marginBottom:20
  },
  container: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  categories_text: {
    fontFamily: 'System', 
    fontWeight: '600', 
    color: '#4A5568', 
  },
  
  categories_item: {
    display: 'flex', // 对应于 CSS 中的 flex
    flexDirection: 'column', // 默认情况下，React Native 的 flex 是行布局，若想模仿垂直间距则需设为 column
    justifyContent: 'center', // 对应于 CSS 中的 items-center
    alignItems: 'center', // 同样对应于 items-center，不过在列布局中alignItems才起作用
    paddingBottom: 2, // 对应于 CSS 中的 space-y-2，这里只能手动设定垂直间距
    marginRight: 10
  },
  roundedElement: {
    borderRadius: 18, // 根据设计需求调整此值
    width: 60,
    height: 58,
  },
})