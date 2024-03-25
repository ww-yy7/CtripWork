import { useState, useContext } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Button, ScrollView, Image } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { CartContext } from '../../contexts/CartContext'
import Categories from '../../components/Categories'
import Travels from '../../components/Travels/index.js'





export default function Home() {
    const { cart, addItemCart } = useContext(CartContext)

    const navigation = useNavigation();
    const [products, setProducts] = useState([    
        
    ])

    function handleAddCart(item) {
        addItemCart(item)
    }

    return (
        <SafeAreaView style={stlyes.container}>
            <ScrollView >
                 
            
            <View style={stlyes.cartContent}>
                <Text style={stlyes.title}>让我们一起探索！</Text>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/avatar.png')} style={{height: 40, width: 40}}></Image>
                </TouchableOpacity>

            </View>

            <View>
                <Categories />
            </View>

            <View>
                <Travels/>
            </View>

            </ScrollView>

            

            

            <View style={stlyes.buttoncontainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <View>
                        <Text style={stlyes.dotText}>
                                首页
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("MyTravels")}>
                    <View>
                        <Text style={stlyes.dotText}>
                                我的游记
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={stlyes.buttonAdd} >
                    <Text style={stlyes.buttonText}>+</Text>
                </TouchableOpacity>

                

                <TouchableOpacity onPress={() => navigation.navigate("TravelsDetails")}>
                    <View>
                        <Text style={stlyes.dotText}>
                                游记详情
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <View>
                        <Text style={stlyes.dotText}>
                                我的
                        </Text>
                    </View>
                </TouchableOpacity>
                

            </View>

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    cartContent: {
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
    dotText: {
        fontSize: 18,
    },
    buttonAdd: {
        width: 33,
        paddingStart: 12,
        paddingEnd: 12,
        backgroundColor: '#168fff',
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 2,
    }
})









