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
  BookOpenIcon,
  HomeIcon,
  HeartIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon
} from "react-native-heroicons/outline";
import {

    PlusCircleIcon,
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
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <HomeIcon color="#2677e2"></HomeIcon>;
            } else {
              return <HomeIcon color="grey"></HomeIcon>;
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
              return <HeartIcon color="#2677e2" ></HeartIcon>;
            } else {
              return <HeartIcon color="grey"></HeartIcon>;
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
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <ChatBubbleBottomCenterTextIcon color="#2677e2"></ChatBubbleBottomCenterTextIcon>;
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
              return <UserIcon  color="#2677e2"></UserIcon>;
            } else {
              return <UserIcon color="grey"></UserIcon>;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default BottomTabs;
