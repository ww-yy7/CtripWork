import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  RefreshControl,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Travels from "../../components/Travels";
import HomeSwiper from "../../components/HomeSwiper";
import { UserContext } from "../../contexts/UserContext";
import { getAllTravelNote } from "../../apis/user";

export default function Home() {
  const navigation = useNavigation();
  const { token, id, changeAvatar } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (id) {
      getAllTravelNote({ _id: id }).then((users) => {
        // 更新状态以存储用户数据
        setUserInfo(users);
        // console.log(userInfo);
      });
    }
  }, [id, changeAvatar]);

  // 防止从搜索页返回后自动聚焦到搜索Input导致二次跳转
  const inputRef = useRef(null);

  const ToSearch = () => {
      navigation.navigate("Search")
      // 在跳转后取消焦点
      inputRef.current?.blur();
  };

  // 右上角头像跳转区分
  const handleAvatarlink = () =>{
      if(token){
          navigation.navigate("EditProfile")
      }else{
          navigation.navigate("Mine")
      }
  }
           
    return (

        <SafeAreaView style={stlyes.container}>
            {/* <View> */}
            <View style={stlyes.top}>
                <Text style={stlyes.title}>让我们一起探索！</Text>
                <TouchableOpacity onPress={handleAvatarlink}>
                    <Image 
                    // source={require('../../../assets/images/avatar.png')}
                    source={token && userInfo && userInfo.Avatar ? { uri: `data:image/jpeg;base64,${userInfo.Avatar}` } : require('../../../assets/images/avatar.png')}
                
                    style={{height: 40, width: 40, borderRadius: 30}}/>
                </TouchableOpacity>

            </View>

      <View>
        <View style={stlyes.serchandinput}>
          <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />

          <TextInput
            placeholder="搜索游记、用户..."
            placeholderTextColor={"gray"}
            ref={inputRef}
            onFocus={ToSearch}
            //   value={searchText}
            //   onSubmitEditing={() => navigation.navigate("Search")}
            style={stlyes.input}
          />
        </View>
      </View>
      {/* <View>
        <Categories />
      </View> */}
      <View>
        <HomeSwiper />
      </View>
      <View>
        <Travels />
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
}

const stlyes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingEnd: 14,
    paddingStart: 14,
  },
  buttoncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: "4%",
    top: 5,
    left: 8,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  banana: {
    fontSize: 42,
    color: "orange",
  },
  dot: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 12,
    position: "absolute",
    zIndex: 99,
    bottom: -2,
    left: -4,
  },
  dottext: {
    fontSize: 9,
    fontWeight: "500",
    color: "gray",
  },
  serchandinput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "neutral-100",
    borderRadius: "100%",
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
  },
});
