import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../pages/Home'
import Cart from '../pages/Cart'
import MyTravels from '../pages/MyTravels';
import TravelsDetails from '../pages/TravelsDetails';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerTitle: '购物车🛒'
                }}
            />

            <Stack.Screen
                name="MyTravels"
                component={MyTravels}
                options={{
                    headerTitle: '我的游记'
                }}
            />

            <Stack.Screen
                name="TravelsDetails"
                component={TravelsDetails}
                options={{
                    headerTitle: '游记详情'
                }}
            />
        </Stack.Navigator>
    )
}