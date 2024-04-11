import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TravelsDetails from "../pages/TravelsDetails";
import Login from "../pages/Login";
import BottomTabs from "../navigator";
import Register from "../pages/Register";
import SearchScreen from "../pages/Search";
import Setting from "../pages/Setting";
import EditProfile from "../pages/EditProfile";
import LoginAgreement from "../pages/Agreement";
import Other from "../pages/Other";
import ModifyProfile from "../pages/ModifyProfile";
import UpdateTravel from "../pages/UpdateTravel";

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
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="TravelsDetails"
        component={TravelsDetails}
        options={{
          headerTitle: "游记详情",
          headerShown: false,
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: "登录页",
          headerShown: false,
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: "注册页",
          headerShown: false,
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: "搜索页",
          headerShown: false,
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerTitle: "设置",
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: "修改个人信息",
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="LoginAgreement"
        component={LoginAgreement}
        options={{
          headerTitle: "《乐游记平台使用协议》",
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="Other"
        component={Other}
        options={{
          headerTitle: "加班开发中...",
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="ModifyProfile"
        component={ModifyProfile}
        options={{
          headerTitle: "修改个人简介",
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="UpdateTravel"
        component={UpdateTravel}
        options={{
          headerTitle: "更新游记",
          headerBackTitleVisible: false
        }}
      />
    </Stack.Navigator>
  );
}
