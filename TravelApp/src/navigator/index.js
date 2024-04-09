const React = require("react");
const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");
import Home from "../pages/Home";
import Mine from "../pages/Mine";
import AddTravel from "../pages/AddTravel";
import LikeTravels from "../pages/LikeTravels";
import Message from "../pages/Message";
import {
  HomeIcon as OutlineHomeIcon, // 从outline版本中引入HomeIcon并重命名为OutlineHomeIcon
  HeartIcon as OutlineHeartIcon,
  UserIcon as OutlineUserIcon,
  ChatBubbleBottomCenterTextIcon,
} from "react-native-heroicons/outline";
import {
  PlusCircleIcon,
  HomeIcon as SolidHomeIcon, // 从solid版本中引入HomeIcon并重命名为SolidHomeIcon
  HeartIcon as SolidHeartIcon,
  UserIcon as SolidUserIcon,
  ChatBubbleBottomCenterTextIcon as SolidChatBubbleBottomCenterTextIcon,
} from "react-native-heroicons/solid";

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          tabBarLabel: "首页",
          tabBarActiveTintColor: "#2677e2",
          // tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <SolidHomeIcon color="#2677e2"></SolidHomeIcon>;
            } else {
              return <OutlineHomeIcon color="gray"></OutlineHomeIcon>;
            }
          },
        }}
      />

      <Tab.Screen
        name="likeTravels"
        component={LikeTravels}
        options={{
          headerBackTitleVisible: false,
          title: "看看大家都去哪儿玩~",
          tabBarLabel: "推荐",
          tabBarActiveTintColor: "#2677e2",
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <SolidHeartIcon color="#2677e2"></SolidHeartIcon>;
            } else {
              return <OutlineHeartIcon color="grey"></OutlineHeartIcon>;
            }
          },
        }}
      />
      <Tab.Screen
        name="AddTravel"
        component={AddTravel}
        options={{
          headerBackTitleVisible: false,
          title: "记录life",
          tabBarLabel: "",
          tabBarActiveTintColor: "#2677e2",
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <PlusCircleIcon color="#2677e2" size={40}></PlusCircleIcon>
              );
            } else {
              return (
                <PlusCircleIcon color="#2677e2" size={40}></PlusCircleIcon>
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          tabBarLabel: "消息",
          tabBarActiveTintColor: "#2677e2",
          // tabBarActiveTintColor: "grey",
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <SolidChatBubbleBottomCenterTextIcon color="#2677e2"></SolidChatBubbleBottomCenterTextIcon>
              );
            } else {
              return (
                <ChatBubbleBottomCenterTextIcon color="grey"></ChatBubbleBottomCenterTextIcon>
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Mine"
        component={Mine}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          tabBarLabel: "我的",
          tabBarActiveTintColor: "#2677e2",
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <SolidUserIcon color="#2677e2"></SolidUserIcon>;
            } else {
              return <OutlineUserIcon color="grey"></OutlineUserIcon>;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default BottomTabs;
