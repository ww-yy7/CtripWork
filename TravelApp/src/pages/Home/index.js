import React,{useState,useContext} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput, RefreshControl  } from 'react-native'
import { MagnifyingGlassIcon,} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Categories from '../../components/Categories'
import Travels from '../../components/Travels'
import { UserContext } from '../../contexts/UserContext'
import { getAllTravelNote } from '../../apis/user'
import a from '@ant-design/react-native/lib/modal/alert'




export default function Home() {
    
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const {travelsData, setTravelsData} = useContext(UserContext);
    
    // 首页下拉更新
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

       
    return (
        

        <SafeAreaView 
          style={stlyes.container}>
            {/* <ScrollView 
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />}
            > */}
            <View>
                 
            
            <View style={stlyes.top}>
                <Text style={stlyes.title}>让我们一起探索！</Text>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/avatar.png')} style={{height: 40, width: 40}}></Image>
                </TouchableOpacity>

            </View>

            <View>
                
                <View style={stlyes.serchandinput}>
                    <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
                    
                    <TextInput
                      placeholder='搜索游记、用户...'
                      placeholderTextColor={'gray'}
                    //   onFocus={() => navigation.navigate("Search")}
                    //   value={searchText}
                      onSubmitEditing={() => navigation.navigate("Search")}
                      style={stlyes.input}
                      />
                    
                </View>
                
            </View>
            <View>
                <Categories />
            </View>
            <View >
                <Travels/>
            </View>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
        
    )
}

const stlyes = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingEnd: 14,
        paddingStart: 14,
    },
    buttoncontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        height:'4%',
        top:5,
        left:8
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    banana: {
        fontSize: 42,
        color: 'orange',
    },
    dot: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "red",
        width: 20,
        height: 20,
        borderRadius: 12,
        position: 'absolute',
        zIndex: 99,
        bottom: -2,
        left: -4,
    },
    dottext:{
        fontSize: 9,
        fontWeight:'500',
        color:"gray"
    },
    serchandinput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'neutral-100', 
        borderRadius: '100%', 
        padding: 6,
        paddingLeft: 12, 
        paddingRight: 2,

    },
    input: {
        flexGrow: 1,
        fontSize: 16,
        // marginBottom: 0,
        paddingLeft: 8,
        letterSpacing: 1,
    }
})









