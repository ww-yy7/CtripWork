import { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Button, Image, ScrollView, TouchableHighlight } from 'react-native'
import { CartContext } from '../../contexts/CartContext'
import MyHome from '../../components/MyHome'
import MyTravelList from '../../components/MyTravelList'
import { Card, WhiteSpace, WingBlank, } from '@ant-design/react-native'
import { Cog6ToothIcon, ViewfinderCircleIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

export default function Cart() {
    const navigation = useNavigation();
    const token = false
    // 判断是否登录
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // 当 token 发生变化时，更新登录状态
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);
    // console.log(isLoggedIn)

    // 控制组件显示
    const [showComponent, setShowComponent] = useState('travelList'); // 初始显示 `<MyHome />`
    const handleShowHome = () => {
        setShowComponent('home');
    };
    const handleShowTravelList = () => {
        setShowComponent('travelList');
    };


    return (
        <View style={styles.container}>
            {/* 没有登录的时候显示 */}
            {!isLoggedIn && (
                <View>
                    {/* 放一些小图标，不一定要有功能 */}
                    <View style={styles.headerIcon}>
                        <ViewfinderCircleIcon size={20} strokeWidth={3} color="gray" />
                        <Cog6ToothIcon size={20} strokeWidth={3} color="gray" />
                    </View>
                    {/* 放置头像信息等模块 */}
                    <WhiteSpace size="xl" />
                    <WingBlank size="lg">
                        {/* 未登录的时候 */}
                        <Card style={styles.headerCard}>
                            <Text>登录携程，开启旅程</Text>
                            <View style={styles.changeButton}>
                                    <Button title="登录/注册"  onPress={() => navigation.navigate("Login")} />
                                    <Button title="手机号查单"  onPress={() => navigation.navigate("/")} />
                                </View>
                        </Card>
                    </WingBlank>
                    {/* 静态页面 */}
                    {/* <Card>
                        <Text>静态页面，需要设计</Text>
                    </Card> */}

                </View>
            )}

            {/* 登录的时候显示 */}
            {isLoggedIn && (
                <View>
                    <ScrollView>
                        {/* 放一些小图标，不一定要有功能 */}
                        <View style={styles.headerIcon}>
                            <ViewfinderCircleIcon size={20} strokeWidth={3} color="gray" />
                            <Cog6ToothIcon size={20} strokeWidth={3} color="gray" />
                        </View>
                        {/* 放置头像信息等模块 */}
                        <WhiteSpace size="xl" />
                        <WingBlank size="lg">
                            {/* 登录的时候 */}
                            <Card style={styles.headerCard}>
                                {/* 头像及用户名等 */}
                                <View style={styles.user}>
                                    {/* 头像 */}
                                    <Image
                                        style={styles.avatar}
                                        source={require('../../../assets/images/avatar.png')}
                                    />
                                    <View >
                                        {/* 用户名 */}
                                        <Text>ww</Text>
                                        <Text>黄金贵宾</Text>
                                    </View>

                                </View>
                                <Text>简单的自我介绍，让你更受欢迎</Text>
                                <Text>粉丝0 关注0 获赞0 赞过0</Text>
                            </Card>

                        </WingBlank>

                        {/* 放个人游记列表处 */}
                        <WhiteSpace size="lg" />
                        <WingBlank size="sm">
                            <Card style={styles.listCard}>
                                <View style={styles.changeButton}>
                                    <Button title="我的游记" onPress={handleShowTravelList} />
                                    <Button title="个人主页" onPress={handleShowHome} />
                                </View>
                                <View>
                                    {/* 根据状态变量显示对应的组件 */}
                                    {showComponent === 'home' && <MyHome />}
                                    {showComponent === 'travelList' && <MyTravelList />}
                                </View>

                            </Card>
                        </WingBlank>

                    </ScrollView>
                </View>)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 30,
    },
    headerIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerCard: {
        padding: 10
    },
    user: {
        flexDirection: 'row',
        height: 60,
    },
    avatar: {
        marginTop: -20,
        width: 80,
        height: 80,
    },
    listCard: {
        height: 1000
    },
    changeButton: {
        flexDirection: 'row',
        justifyContent: 'center',
    }

})