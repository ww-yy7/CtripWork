import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/Home";
import Mine from "../pages/Mine";
import MyTravels from "../pages/MyTravels";
import TravelsDetails from "../pages/TravelsDetails";
import Login from "../pages/Login";
import AddTravel from '../pages/AddTravel';

import { travelsData } from "../constants";
import Register from "../pages/Register";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Mine"
        component={Mine}
        options={{
          headerTitle: "我的",
        }}
      />

      <Stack.Screen
        name="MyTravels"
        component={MyTravels}
        options={{
          headerTitle: "我的游记",
        }}
      />

      <Stack.Screen
        name="TravelsDetails"
        component={TravelsDetails}
        options={{
          headerTitle: "游记详情",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: "登录页",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: "注册页",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="addTravel"
        component={AddTravel}
        options={{
          headerTitle: "添加游记",
        }}
      />
    </Stack.Navigator>
  );
}
