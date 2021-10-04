import React from "react";
import Home from "@screens/Home";
import EHome from "@screens/EHome";
import Profile from "@screens/Profile";
import ENotification from "@screens/ENotification";
import { BottomTabNavigatorMazi, tabBarIcon } from "@navigation/components";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SignIn from "../../screens/SignIn";

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const MainTabScreen = ({ navigation }) => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={MainStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
        tabBarBadge: 3,
        tabBarBadgeStyle: { backgroundColor: "blue" },
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
        tabBarBadge: 3,
        tabBarBadgeStyle: { backgroundColor: "blue" },
      }}
    />
    <Tab.Screen
      name="Inbox"
      component={ENotification}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),
        tabBarBadge: 3,
        tabBarBadgeStyle: { backgroundColor: "blue" },
      }}
    />
  </Tab.Navigator>
);

const MainStackScreen = ({ navigation }) => (
  <MainStack.Navigator headerMode="none">
    <MainStack.Screen name="Home" component={Home}></MainStack.Screen>
    {/* <MainStack.Screen name="Profile" component={Profile}></MainStack.Screen> */}
    <MainStack.Screen name="SignIn" component={SignIn}></MainStack.Screen>
    {/* sign ini harusnya di ilangin ya nanti, diganti di authstack  */}
  </MainStack.Navigator>
);
