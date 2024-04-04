import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
import { MagnifyingGlassIcon, BookOpenIcon, PlusCircleIcon, HomeIcon, HeartIcon,UserIcon} from 'react-native-heroicons/outline'
// import { } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

import Categories from '../../components/Categories'
import Travels from '../../components/Travels'
import SearchScreen from '../Serch'
import { AlignRight } from 'react-native-feather'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MyTravels from '../MyTravels'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function Home() {
    
    const navigation = useNavigation();

       
    return (
        

        <SafeAreaView style={stlyes.container}>
            <ScrollView >
                 
            
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

            <View>
                <Travels/>
            </View>

            </ScrollView>

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









