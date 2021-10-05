import { ApplicationActions } from "@actions";
import { AssistiveTouch } from "@components";
import { BaseSetting, useTheme } from "@config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { languageSelect } from "@selectors";
import * as Utils from "@utils";
import i18n from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { initReactI18next } from "react-i18next";
import { Platform, StatusBar, View } from "react-native";
import { DarkModeProvider, useDarkMode } from "react-native-dark-mode";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import { AllScreens, ModalScreens } from "./config";
const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();

import { StackActions } from "@react-navigation/native";
import { MainStackScreen, MainTabScreen } from "./config/MainStackScreen";
import { AuthStackScreen } from "./config/AuthStackScreen";

const MainScreens = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen
        name="MainStack"
        component={MainStackScreen}
      ></MainStack.Screen>
      {/* {Object.keys(AllScreens).map((name, index) => {
        const { component, options } = AllScreens[name];
        return (
          <MainStack.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        );
      })} */}
    </MainStack.Navigator>
  );
};

const Navigator = (props) => {
  const { theme, colors } = useTheme();
  const isDarkMode = useDarkMode();
  const language = useSelector(languageSelect);
  const { navigation } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigationRef = useRef(null);
  const [users, setUsers] = useState(false);

  useEffect(() => {
    // Hide screen loading
    SplashScreen.hide();

    // Config status bar
    if (Platform.OS == "android") {
      StatusBar.setBackgroundColor(colors.primary, true);
    }
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content", true);
    const onProcess = async () => {
      // Get current language of device
      const languageCode = language ?? BaseSetting.defaultLanguage;
      dispatch(ApplicationActions.onChangeLanguage(languageCode));
      // Config language for app
      await i18n.use(initReactI18next).init({
        resources: BaseSetting.resourcesLanguage,
        lng: languageCode,
        fallbackLng: languageCode,
      });
      setTimeout(() => {
        Utils.enableExperimental();
        setLoading(false);

        setUsers(true);
        //disini ditaro kayak usercontroller untuk validasi dan insert item ke storage
        //contohnya ada di setiap sign in mobile

        // navigationRef?.current?.dispatch(StackActions.("SignIn"));
        //bisa kasih validasi disini, jika login apa dan tidak login apa
      }, 300);
    };
    onProcess();
  }, []);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <DarkModeProvider>
        <NavigationContainer theme={theme} ref={navigationRef}>
          <MainStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {!users ? (
              <MainStack.Screen
                name="MainStack"
                component={MainTabScreen}
              ></MainStack.Screen>
            ) : (
              <AuthStack.Screen
                name="AuthStackScreen"
                component={AuthStackScreen}
              ></AuthStack.Screen>
            )}
            {/* {!loading ? (
              <MainStack.Screen
                name="MainStack"
                component={MainTabScreen}
              ></MainStack.Screen>
            ) : (
              <AuthStack.Screen
                name="AuthStackScreen"
                component={AuthStackScreen}
              ></AuthStack.Screen>
            )} */}
            {/* <MainStack.Screen
              name="MainStack"
              component={MainTabScreen}
            ></MainStack.Screen> */}
          </MainStack.Navigator>
        </NavigationContainer>
      </DarkModeProvider>
    </View>
  );
};

export default Navigator;
