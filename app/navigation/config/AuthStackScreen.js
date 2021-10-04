import React from "react";
import Home from "@screens/Home";
import Profile from "@screens/Profile";
import { BottomTabNavigatorMazi, tabBarIcon } from "@navigation/components";

import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../../screens/SignIn";
import SignUp from "../../screens/SignUp";

const AuthStack = createStackNavigator();

export const AuthStackScreen = ({ navigation }) => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="SignIn" component={SignIn}></AuthStack.Screen>
    <AuthStack.Screen name="SignUp" component={SignUp}></AuthStack.Screen>
  </AuthStack.Navigator>
);
