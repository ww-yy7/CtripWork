import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../../pages/Home';
import MyTravels from '../../pages/MyTravels';
// import AddButtonScreen from './screens/AddButtonScreen'; // 代替 "+" 按钮的单独页面
import Cart from '../../pages/Cart';// 代替 “游记详情” 页面
// import MyScreen from './screens/MyScreen';

const Tab = createBottomTabNavigator();

export default TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MyTravels') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'AddButton') {
            iconName = 'add-circle';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'My') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Return the icon
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#168fff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MyTravels" component={MyTravels} />
      {/* <Tab.Screen name="AddButton" component={AddButtonScreen} options={{ tabBarLabel: '' }} /> 不显示文字标签 */}
      <Tab.Screen name="CartDetails" component={Cart} />
      {/* <Tab.Screen name="My" component={MyScreen} /> */}
    </Tab.Navigator>
  );
};

// export default function App() {
//   return (
//     <NavigationContainer>
//       <TabNavigator />
//     </NavigationContainer>
//   );
// }