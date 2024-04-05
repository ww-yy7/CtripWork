import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TravelsDetails from "../pages/TravelsDetails";
import Login from "../pages/Login";
import BottomTabs from "../navigator";
import Register from "../pages/Register";
import SearchScreen from "../pages/Serch";
import Setting from "../pages/Setting";
import EditProfile from "../pages/EditProfile";
import LoginAgreement from "../pages/Agreement/LoginAgreement";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      {/* 底部导航栏 */}
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: "注册页",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: "搜索页",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerTitle: "设置",
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: "修改简介",
        }}
      />
       <Stack.Screen
        name="LoginAgreement"
        component={LoginAgreement}
        options={{
          headerTitle: "用户登录协议",
        }}
      />
    </Stack.Navigator>
  );
}
