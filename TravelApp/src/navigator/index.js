const React = require("react");
const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");
import Home from "../pages/Home";
import Mine from "../pages/Mine";
import MyTravels from "../pages/MyTravels";
import AddTravel from "../pages/AddTravel";
import TravelsDetails from "../pages/TravelsDetails";
import LikeTravels from "../pages/LikeTravels";
import Message from "../pages/Message"

import {
  // HomeIcon,
  // HeartIcon,
  // UserIcon,
  // ChatBubbleBottomCenterTextIcon
} from "react-native-heroicons/outline";
import {
    PlusCircleIcon,
  } from "react-native-heroicons/solid";

import {
  HomeIcon as OutlineHomeIcon,  // 从outline版本中引入HomeIcon并重命名为OutlineHomeIcon
  HeartIcon as OutlineHeartIcon,
  UserIcon as OutlineUserIcon,
  ChatBubbleBottomCenterTextIcon
} from "react-native-heroicons/outline";

import {
    HomeIcon as SolidHomeIcon,  // 从solid版本中引入HomeIcon并重命名为SolidHomeIcon
    HeartIcon as SolidHeartIcon,
    UserIcon as SolidUserIcon,
    ChatBubbleBottomCenterTextIcon as SolidChatBubbleBottomCenterTextIcon,
    // PlusCircleIcon,
  } from "react-native-heroicons/solid";


const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "首页",
          tabBarActiveTintColor: "#2677e2",
          // tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              // return <HomeIcon color="#2677e2"></HomeIcon>;
              return <SolidHomeIcon color="#2677e2"></SolidHomeIcon>
            } else {
              // return <HomeIcon color="grey"></HomeIcon>;
              return <OutlineHomeIcon color="gray"></OutlineHomeIcon>
            }
          },
        }}
      />

      <Tab.Screen
        name="likeTravels"
        component={LikeTravels}
        options={{
          headerShown: false, 
          tabBarLabel: "推荐",
          tabBarActiveTintColor: "#2677e2",
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              // return <HeartIcon color="#2677e2" ></HeartIcon>;
              return <SolidHeartIcon color="#2677e2"></SolidHeartIcon>
            } else {
              // return <HeartIcon color="grey"></HeartIcon>;
              return <OutlineHeartIcon color="grey"></OutlineHeartIcon>
            }
          },
        }}
      />
      <Tab.Screen
        name="AddTravel"
        component={AddTravel}
        options={{
          // headerShown: false,
          title: "记录life",
          tabBarLabel: "",
          tabBarActiveTintColor: "#2677e2",
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <PlusCircleIcon color="#2677e2" size={40}></PlusCircleIcon>;
            } else {
              return <PlusCircleIcon color="#2677e2" size={40}></PlusCircleIcon>;
            }
          },
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          headerShown: false,
          tabBarLabel: "消息",
          tabBarActiveTintColor: "#2677e2",
          // tabBarActiveTintColor: "grey",
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              // return <ChatBubbleBottomCenterTextIcon color="#2677e2"></ChatBubbleBottomCenterTextIcon>;
              return <SolidChatBubbleBottomCenterTextIcon color="#2677e2"></SolidChatBubbleBottomCenterTextIcon>
            } else {
              return <ChatBubbleBottomCenterTextIcon color="grey"></ChatBubbleBottomCenterTextIcon>;
            }
          },
        }}
      />
      <Tab.Screen
        name="Mine"
        component={Mine}
        options={{
          headerShown: false,
          tabBarLabel: "我的",
          tabBarActiveTintColor: "#2677e2",
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              // return <UserIcon  color="#2677e2"></UserIcon>;
              return <SolidUserIcon color="#2677e2"></SolidUserIcon>
            } else {
              // return <UserIcon color="grey"></UserIcon>;
              return <OutlineUserIcon color="grey"></OutlineUserIcon>
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default BottomTabs;
