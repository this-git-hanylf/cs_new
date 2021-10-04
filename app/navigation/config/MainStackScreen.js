import React from "react";
import Home from "@screens/Home";
import Profile from "@screens/Profile";
import { BottomTabNavigatorMazi, tabBarIcon } from "@navigation/components";

import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator();

export const MainStackScreen = ({ navigation }) => (
  <MainStack.Navigator headerMode="none">
    <MainStack.Screen name="Home" component={Home}></MainStack.Screen>
    <MainStack.Screen name="Profile" component={Profile}></MainStack.Screen>
  </MainStack.Navigator>
);

const CSTabScreens = {
  Home: {
    component: Home, //ini adalah nama import screen
    options: {
      title: "home",
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: "home" }),
    },
  },
  Profil: {
    component: Profile, // ini adalah nama import screen
    options: {
      title: "profil",
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: "chart-bar" }),
    },
  },
};

export const CSMenu = () => (
  <BottomTabNavigatorMazi tabScreens={CSTabScreens} />
  // <MainStack.Navigator>
  //   <MainStack.Screen name="Home" component={Home}></MainStack.Screen>
  //   <MainStack.Screen name="Profie" component={Profile}></MainStack.Screen>
  // </MainStack.Navigator>
);
